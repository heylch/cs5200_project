package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.jpas.Publisher;
import edu.northeastern.cs5200.jpas.PublisherRepository;





@RestController
@Controller
public class PublisherDao {
	@Autowired
	PublisherRepository publisherRepository;
	@PostMapping("/api/test/publisher")
	public Publisher createPerson(@RequestBody Publisher publisher) {
		return publisherRepository.save(publisher);
	}

}
