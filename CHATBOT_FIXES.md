# Chatbot Deployment and Troubleshooting Guide

## Quick Fixes for Common Issues

### Issue 1: Chatbot Not Positioned Correctly ✅ FIXED

**Problem**: Chatbot appears to float across sections instead of staying in the bottom-right corner globally.

**Root Cause**: Chatbot was constrained within React component tree and container positioning.

**Solution**: Implemented React Portal solution to render chatbot directly to document.body.

**Changes Made**:

- Used `createPortal` to render chatbot outside of React component tree
- Created dedicated portal root attached directly to `document.body`
- Set maximum z-index values (`999999`) to ensure always on top
- Added aggressive CSS positioning with `!important` declarations
- Positioned chatbot at document level, not within any container constraints

**Technical Implementation**:

```tsx
// Creates portal div attached to document.body
const root = document.createElement("div");
root.style.cssText = `
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 999999 !important;
  pointer-events: none !important;
`;
document.body.appendChild(root);

// Render chatbot using React Portal
return createPortal(chatbotContent, root);
```

### Issue 2: Chatbot Not Working on Vercel

**Problem**: Chatbot works locally but fails on Vercel deployment.

**Root Cause**: Environment variable configuration and API route handling.

**Solution**:

1. **Environment Variable Setup**:

   - In Vercel Dashboard: Settings → Environment Variables
   - Add: `GOOGLE_GENAI_API_KEY` (NOT `VITE_GOOGLE_GENAI_API_KEY`)
   - Set for: Production, Preview, and Development

2. **API Configuration**:
   - Added `vercel.json` for proper function configuration
   - Enhanced error handling in API routes
   - Added CORS headers for cross-origin requests

## Vercel Deployment Steps

### 1. Environment Variables Setup

```bash
# In Vercel Dashboard (Settings > Environment Variables):
GOOGLE_GENAI_API_KEY = your_actual_api_key_here
```

### 2. Verify API Key

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key if needed
- Copy the key to Vercel environment variables

### 3. Deploy and Test

```bash
# Push changes
git add .
git commit -m "fix: chatbot positioning and Vercel deployment"
git push origin main

# Vercel will auto-deploy
# Test chatbot functionality after deployment
```

## Testing Checklist

### Local Testing

- [ ] Chatbot launcher appears in bottom-right corner
- [ ] Chatbot stays fixed when scrolling through sections
- [ ] Chat window opens/closes properly
- [ ] Messages send and receive responses
- [ ] No console errors

### Production Testing (Vercel)

- [ ] Chatbot positioning is correct
- [ ] API endpoint responds: `/api/chat`
- [ ] Environment variable is accessible
- [ ] Error messages are helpful if something fails

## Troubleshooting Commands

### Check API Locally

```bash
# Start dev server
npm run dev

# Test API endpoint
curl -X POST http://localhost:5174/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"content":"Hello"}]}'
```

### Debug Vercel Deployment

```bash
# View Vercel logs
vercel logs your-deployment-url

# Check function logs specifically
vercel logs --follow
```

## Common Error Messages

### "GOOGLE_GENAI_API_KEY environment variable is not set"

- **Fix**: Add the environment variable in Vercel Dashboard
- **Note**: Use `GOOGLE_GENAI_API_KEY`, not `VITE_GOOGLE_GENAI_API_KEY`

### "Chat API error" / Network issues

- **Fix**: Check CORS headers and API route configuration
- **Debug**: Check browser Network tab for actual error response

### Chatbot not visible or positioned incorrectly

- **Fix**: Check z-index conflicts with other elements
- **Debug**: Use browser inspector to check element positioning

## File Changes Summary

### Modified Files:

- `/api/chat.ts` - Enhanced error handling and CORS
- `/server/chains/googleGenAIChain.ts` - Improved environment variable handling
- `/src/services/api.ts` - Better error handling and debugging
- `/src/components/Chatbot/Chatbot.module.css` - Fixed positioning and z-index
- `/src/components/Chatbot/ChatbotWidget.tsx` - Added container wrapper
- `/src/index.css` - Added chatbot-specific positioning rules
- `/.env.example` - Updated with deployment instructions

### New Files:

- `/vercel.json` - Vercel configuration for API functions

## Support

If issues persist after following this guide:

1. Check Vercel function logs for detailed error messages
2. Verify environment variable is exactly `GOOGLE_GENAI_API_KEY`
3. Test API endpoint directly using curl or Postman
4. Ensure Google AI API key has proper permissions and quota

---

_Last updated: July 3, 2025_
