import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';
import '../providers/data_provider.dart';
import 'login_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider);
    final data = ref.watch(dataProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Studio App'),
        actions: [
          if (user != null)
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () => ref.read(authProvider.notifier).signOut(),
            )
          else
            TextButton(
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const LoginScreen()),
              ),
              child: const Text('Login', style: TextStyle(color: Colors.white)),
            ),
        ],
      ),
      body: ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, index) {
          final item = data[index];
          return ListTile(
            title: Text(item['value'] ?? 'No value'),
            subtitle: Text(item['created_at'] ?? ''),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _addItem(context, ref, user),
        child: const Icon(Icons.add),
      ),
    );
  }

  void _addItem(BuildContext context, WidgetRef ref, User? user) async {
    if (user == null) {
      // Require sign-in
      final result = await Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => const LoginScreen()),
      );
      if (result != true) return;
    }

    final controller = TextEditingController();
    final result = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add New Value'),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(hintText: 'Enter value'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, controller.text),
            child: const Text('Add'),
          ),
        ],
      ),
    );

    if (result != null && result.isNotEmpty) {
      try {
        await ref.read(dataProvider.notifier).addItem(result);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Item added and synced!')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')),
        );
      }
    }
  }
}