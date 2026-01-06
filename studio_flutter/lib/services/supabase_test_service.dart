import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseTestService {
  static final _supabase = Supabase.instance.client;

  // Test 1: Sign up a user
  static Future<bool> testUserSignup({
    required String email,
    required String name,
    required String password,
    required int age,
  }) async {
    try {
      print('🧪 Test 1: Testing user signup...');
      print('Email: $email');
      print('Name: $name');
      print('Age: $age');
      
      // Sign up with Supabase Auth
      final response = await _supabase.auth.signUp(
        email: email,
        password: password,
      );

      if (response.user != null) {
        print('✅ User signup successful!');
        print('User ID: ${response.user!.id}');
        
        // Now save additional user data to custom users table
        await _saveUserData(
          userId: response.user!.id,
          email: email,
          name: name,
          age: age,
        );
        
        return true;
      }
      return false;
    } catch (e) {
      print('❌ Signup error: $e');
      return false;
    }
  }

  // Test 2: Save user data to users table
  static Future<void> _saveUserData({
    required String userId,
    required String email,
    required String name,
    required int age,
  }) async {
    try {
      print('\n🧪 Test 2: Saving user data to database...');
      
      final response = await _supabase.from('users').insert({
        'id': userId,
        'email': email,
        'name': name,
        'age': age,
        'created_at': DateTime.now().toIso8601String(),
      });

      print('✅ User data saved successfully!');
      print('Response: $response');
    } catch (e) {
      print('❌ Database save error: $e');
      print('Note: The "users" table may not exist yet.');
      print('Create it in Supabase dashboard with columns: id, email, name, age, created_at');
    }
  }

  // Test 3: Retrieve all users
  static Future<List<Map<String, dynamic>>> testGetAllUsers() async {
    try {
      print('\n🧪 Test 3: Retrieving all users...');
      
      final response = await _supabase.from('users').select();
      
      print('✅ Users retrieved: ${response.length}');
      for (var user in response) {
        print('  - ${user['name']} (${user['email']}) Age: ${user['age']}');
      }
      
      return List<Map<String, dynamic>>.from(response);
    } catch (e) {
      print('❌ Retrieval error: $e');
      return [];
    }
  }

  // Test 4: Sign in with email and password
  static Future<bool> testUserSignin({
    required String email,
    required String password,
  }) async {
    try {
      print('\n🧪 Test 4: Testing user signin...');
      
      final response = await _supabase.auth.signInWithPassword(
        email: email,
        password: password,
      );

      if (response.user != null) {
        print('✅ User signin successful!');
        print('User: ${response.user!.email}');
        return true;
      }
      return false;
    } catch (e) {
      print('❌ Signin error: $e');
      return false;
    }
  }
}