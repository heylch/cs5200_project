package edu.northeastern.cs5200.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.jpas.BookstoreRepository;
import edu.northeastern.cs5200.jpas.PublisherRepository;
import edu.northeastern.cs5200.jpas.ReaderRepository;
import edu.northeastern.cs5200.jpas.User;
import edu.northeastern.cs5200.jpas.UserRepository;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	ReaderRepository readerRepository;
	@Autowired
	PublisherRepository publisherRepository;
	@Autowired
	BookstoreRepository bookstoreRepository;
	
	@GetMapping("/api/session/invalidate")
	public String invalidateSession(
	HttpSession session) {
		session.invalidate();
	return "session invalidated";
	}
	@GetMapping("/api/session/set/{attr}/{value}")
	public String setSessionAttribute(
			@PathVariable("attr") String attr,
			@PathVariable("value") String value,
			HttpSession session) {
		session.setAttribute(attr, value);
		return attr + " = " + value;
	}
	@GetMapping("/api/session/get/{attr}")
	public String getSessionAttribute(
			@PathVariable ("attr") String attr,
			HttpSession session) {
		return (String)session.getAttribute(attr);
	}

	
	List<User> users = new ArrayList<User>();
	@PostMapping("/api/register")
	public User register(@RequestBody User user,
	HttpSession session) {
		session.setAttribute("currentUser", user);
		users.add(user);
		userRepository.save(user);
		return user;
	}
	
	@GetMapping("/api/profile")
	public User profile(HttpSession session) {
	User currentUser = (User)
	session.getAttribute("currentUser");	
	return currentUser;
	}
	
	@PostMapping("/api/logout")
	public void logout
	(HttpSession session) {
		session.invalidate();
	}



}
