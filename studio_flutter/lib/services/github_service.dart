import 'dart:io';
import 'package:path_provider/path_provider.dart';

class GitHubService {
  static Future<void> syncToGitHub() async {
    try {
      // Get the app directory
      final appDir = await getApplicationDocumentsDirectory();
      final repoPath = '${appDir.path}/repo'; // Assuming a local repo copy

      // For demo, assume the repo is cloned locally
      // In real app, you'd need to clone or have the repo

      // Run git commands
      await _runCommand('git', ['add', '.'], workingDirectory: repoPath);
      await _runCommand('git', ['commit', '-m', 'Auto sync: New item added'], workingDirectory: repoPath);
      await _runCommand('git', ['push'], workingDirectory: repoPath);
    } catch (e) {
      print('GitHub sync failed: $e');
      // In real app, handle errors
    }
  }

  static Future<void> _runCommand(String command, List<String> args, {String? workingDirectory}) async {
    final result = await Process.run(command, args, workingDirectory: workingDirectory);
    if (result.exitCode != 0) {
      throw Exception('Command failed: ${result.stderr}');
    }
  }
}