import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/supabase_test_service.dart';

class TestScreen extends ConsumerStatefulWidget {
  const TestScreen({super.key});

  @override
  ConsumerState<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends ConsumerState<TestScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _ageController = TextEditingController();
  String _testOutput = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Supabase API Test')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Test User Signup & Save Data', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            TextField(
              controller: _ageController,
              decoration: const InputDecoration(labelText: 'Age'),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _testSignup,
              child: const Text('Test Signup & Save'),
            ),
            ElevatedButton(
              onPressed: _testGetUsers,
              child: const Text('Get All Users'),
            ),
            ElevatedButton(
              onPressed: _testSignin,
              child: const Text('Test Signin (Admin/Admin)'),
            ),
            const SizedBox(height: 20),
            const Text('Test Output:', style: TextStyle(fontWeight: FontWeight.bold)),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: SelectableText(_testOutput.isEmpty ? 'Test results will appear here...' : _testOutput),
            ),
          ],
        ),
      ),
    );
  }

  void _testSignup() async {
    setState(() => _testOutput = '⏳ Testing signup...\n');
    
    final success = await SupabaseTestService.testUserSignup(
      email: _emailController.text,
      name: _nameController.text,
      password: _passwordController.text,
      age: int.tryParse(_ageController.text) ?? 0,
    );

    setState(() => _testOutput += '\n${success ? '✅ Success!' : '❌ Failed'}');
  }

  void _testGetUsers() async {
    setState(() => _testOutput = '⏳ Fetching users...\n');
    
    final users = await SupabaseTestService.testGetAllUsers();
    
    setState(() {
      _testOutput += '✅ Retrieved ${users.length} users:\n';
      for (var user in users) {
        _testOutput += '- ${user['name']} (${user['email']}) Age: ${user['age']}\n';
      }
    });
  }

  void _testSignin() async {
    setState(() => _testOutput = '⏳ Testing signin with Admin/Admin...\n');
    
    // Note: We need to create the admin user first
    final success = await SupabaseTestService.testUserSignin(
      email: 'admin@example.com',
      password: 'Admin',
    );

    setState(() => _testOutput += '\n${success ? '✅ Signin Success!' : '❌ Signin Failed (User may not exist yet)'}');
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _ageController.dispose();
    super.dispose();
  }
}