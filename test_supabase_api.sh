#!/bin/bash

# Supabase API Test Script
# Tests if we can create users with EMAIL, NAME, PASSWORD, and AGE

SUPABASE_URL="https://ogyofkzsfeqfhapfegwl.supabase.co"
SUPABASE_KEY="sb_publishable_d8oyG4L7qamY2K8bo9a4xg_ylXuB_FU"

echo "🧪 Testing Supabase API Connection..."
echo "URL: $SUPABASE_URL"
echo ""

# Test 1: Check Supabase connectivity
echo "Test 1: Testing basic Supabase connectivity..."
curl -s "$SUPABASE_URL/rest/v1/" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  | head -20
echo ""
echo ""

# Test 2: Try to sign up a user with auth
echo "Test 2: Testing user signup with auth..."
curl -X POST "$SUPABASE_URL/auth/v1/signup" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "TestPassword123"
  }' \
  -w "\nStatus: %{http_code}\n"
echo ""
echo ""

# Test 3: Check if users table exists
echo "Test 3: Checking if users table exists..."
curl -s "$SUPABASE_URL/rest/v1/users?limit=1" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  | head -20
echo ""
echo ""

echo "✅ API tests completed!"
echo ""
echo "Next steps:"
echo "1. Check Supabase dashboard for tables"
echo "2. Create 'users' table with columns: email, name, password, age"
echo "3. Set up Row Level Security (RLS) policies"