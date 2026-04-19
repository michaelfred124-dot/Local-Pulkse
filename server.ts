import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn('STRIPE_SECRET_KEY environment variable is missing. Using mock Stripe mode.');
      return null;
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Stripe Checkout Endpoint
  app.post("/api/checkout", async (req, res) => {
    try {
      const { planId, email, projectId } = req.body;
      const stripe = getStripe();

      if (!stripe) {
        // Mock mode: immediately return a success URL
        console.log(`Mock checkout for ${email}, plan: ${planId}, project: ${projectId}`);
        return res.json({ 
          url: `/dashboard?session_id=mock_session_${Date.now()}&project=${projectId}` 
        });
      }

      // Real Stripe mode
      // Note: In a real app, you'd look up the Price ID based on planId
      // For this MVP, we'll assume a standard $50/mo plan with a 30-day trial
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'LocalLaunch Pro Subscription',
                description: 'Includes hosting, updates, and AI edits.',
              },
              unit_amount: 5000, // $50.00
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        subscription_data: {
          trial_period_days: 30,
        },
        customer_email: email,
        success_url: `${req.protocol}://${req.get('host')}/dashboard?session_id={CHECKOUT_SESSION_ID}&project=${projectId}`,
        cancel_url: `${req.protocol}://${req.get('host')}/editor`,
        metadata: {
          projectId: projectId,
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Stripe checkout error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Industry-specific data API (can be expanded later)
  app.get("/api/industries", (req, res) => {
    const industries = [
      { id: 'food', name: 'Food & Beverage', icon: 'Utensils' },
      { id: 'health', name: 'Health & Wellness', icon: 'HeartPulse' },
      { id: 'services', name: 'Professional Services', icon: 'Briefcase' },
      { id: 'corporate', name: 'Corporate', icon: 'Building2' },
      { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingBag' },
      { id: 'hospitality', name: 'Hospitality', icon: 'Hotel' }
    ];
    res.json(industries);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, "dist");
    
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
