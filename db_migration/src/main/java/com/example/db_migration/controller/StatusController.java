package com.example.db_migration.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class StatusController {

	@GetMapping("/status")
	public Map<String, String> getStatus() {
		return Map.of(
				"application", "db_migration",
				"status", "UP"
		);
	}
}
