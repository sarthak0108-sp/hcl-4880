package com.hcld2.jwtdemo.controller;

import com.hcld2.jwtdemo.entity.Post;
import com.hcld2.jwtdemo.repository.PostRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/posts")

@AllArgsConstructor
public class PostController {
    private final PostRepository posts;

    @GetMapping
    public List<Post> all(){
        return posts.findAllByOrderByCreatedAtDesc();
    }
    @PostMapping
    public Post create(@Valid @RequestBody Post req, Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED, "Not logged in");
        }

        String author = String.valueOf(auth.getPrincipal());
        System.out.println(">>> Creating post as: " + author);

        Post post = new Post(req.getTitle(), req.getContent(), author);
        return posts.save(post);
    }
}