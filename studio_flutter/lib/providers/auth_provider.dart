import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final authProvider = StateNotifierProvider<AuthNotifier, User?>((ref) {
  return AuthNotifier();
});

class AuthNotifier extends StateNotifier<User?> {
  AuthNotifier() : super(null) {
    _init();
  }

  final _supabase = Supabase.instance.client;

  void _init() {
    state = _supabase.auth.currentUser;
    _supabase.auth.onAuthStateChange.listen((event) {
      state = event.session?.user;
    });
  }

  Future<void> signInWithEmail(String email, String password) async {
    final response = await _supabase.auth.signInWithPassword(
      email: email,
      password: password,
    );
    if (response.user != null) {
      state = response.user;
    }
  }

  Future<void> signUpWithEmail(String email, String password) async {
    await _supabase.auth.signUp(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await _supabase.auth.signOut();
    state = null;
  }

  Future<void> resetPassword(String email) async {
    await _supabase.auth.resetPasswordForEmail(email);
  }

  User? get currentUser => state;
}