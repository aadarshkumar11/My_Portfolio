# Vercel Deployment Fix for Environment Variable Error

## Error Message:

```
Environment Variable "GOOGLE_GENAI_API_KEY" references Secret "google_genai_api_key", which does not exist.
```

## ✅ SOLUTION - Step by Step Fix:

### Step 1: Clean Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. **DELETE** any existing `GOOGLE_GENAI_API_KEY` variables
3. **DELETE** any variables that reference secrets (with @ symbol)

### Step 2: Add Environment Variable Correctly

1. Click **"Add New"** in Environment Variables section
2. Set **exactly**:
   - **Key**: `GOOGLE_GENAI_API_KEY`
   - **Value**: `your_actual_google_genai_api_key_here`
   - **Environments**: Check all three (Production, Preview, Development)
3. Click **"Save"**

### Step 3: Important Notes

- ❌ **DON'T** use `@google_genai_api_key` (no @ symbol)
- ❌ **DON'T** use `VITE_GOOGLE_GENAI_API_KEY` (no VITE\_ prefix)
- ❌ **DON'T** reference secrets or use @ symbols
- ✅ **DO** use plain environment variable: `GOOGLE_GENAI_API_KEY`
- ✅ **DO** paste your actual API key as the value

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 5: Get Your Google GenAI API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the generated key
4. Paste it as the value in Vercel environment variables

## Verification

After deployment, your chatbot should work correctly. The API endpoint `/api/chat` should respond without errors.

## Common Mistakes to Avoid:

- Using `@` symbol to reference secrets
- Using `VITE_` prefix (that's for frontend variables)
- Setting up secrets instead of plain environment variables
- Forgetting to set for all environments (Production, Preview, Development)

---

_This fix resolves the Vercel deployment error for the chatbot API functionality._
