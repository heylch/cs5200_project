package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import edu.northeastern.cs5200.jpas.User;
import edu.northeastern.cs5200.jpas.UserRepository;





@RestController
@Controller
public class UserDao {
	@Autowired
	UserRepository userRepository;
	@PostMapping("/api/test/user")
	public User createPerson(@RequestBody User user) {
		return userRepository.save(user);
	}

}
