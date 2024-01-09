import 'package:flutter/material.dart';
import 'package:project/providers/user_provider.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    return const Scaffold(
      body: Center(
        child: Text(
          user.toJson(),
        ),
      ),
    );
  }
}
