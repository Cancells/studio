import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLogin = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(_isLogin ? 'Login' : 'Sign Up')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _authenticate,
              child: Text(_isLogin ? 'Login' : 'Sign Up'),
            ),
            TextButton(
              onPressed: () => setState(() => _isLogin = !_isLogin),
              child: Text(_isLogin ? 'Need to sign up?' : 'Already have account?'),
            ),
            // Default login button
            ElevatedButton(
              onPressed: () => _defaultLogin(),
              child: const Text('Login as Admin'),
            ),
          ],
        ),
      ),
    );
  }

  void _authenticate() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) return;

    try {
      if (_isLogin) {
        await ref.read(authProvider.notifier).signInWithEmail(email, password);
      } else {
        await ref.read(authProvider.notifier).signUpWithEmail(email, password);
      }
      Navigator.pop(context, true);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  void _defaultLogin() async {
    try {
      await ref.read(authProvider.notifier).signInWithEmail('admin@example.com', 'Admin');
      Navigator.pop(context, true);
    } catch (e) {
      // If login fails, try sign up
      try {
        await ref.read(authProvider.notifier).signUpWithEmail('admin@example.com', 'Admin');
        Navigator.pop(context, true);
      } catch (e2) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e2')),
        );
      }
    }
  }
}