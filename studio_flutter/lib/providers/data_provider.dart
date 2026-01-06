import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../services/github_service.dart';

final dataProvider = StateNotifierProvider<DataNotifier, List<Map<String, dynamic>>>((ref) {
  return DataNotifier();
});

class DataNotifier extends StateNotifier<List<Map<String, dynamic>>> {
  DataNotifier() : super([]) {
    _init();
  }

  final _supabase = Supabase.instance.client;

  void _init() {
    _fetchData();
    _supabase.from('items').stream(primaryKey: ['id']).listen((data) {
      state = data;
    });
  }

  Future<void> _fetchData() async {
    final response = await _supabase.from('items').select();
    state = List<Map<String, dynamic>>.from(response);
  }

  Future<void> addItem(String value) async {
    final user = _supabase.auth.currentUser;
    if (user == null) throw Exception('User not signed in');

    await _supabase.from('items').insert({
      'value': value,
      'user_id': user.id,
      'created_at': DateTime.now().toIso8601String(),
    });

    // Auto sync to GitHub
    await GitHubService.syncToGitHub();
  }
}