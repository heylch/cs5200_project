package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import edu.northeastern.cs5200.jpas.Bookstore;
import edu.northeastern.cs5200.jpas.BookstoreRepository;





@RestController
@Controller
public class BookstoreDao {
	@Autowired
	BookstoreRepository bookstoreRepository;
	@PostMapping("/api/test/bookstore")
	public Bookstore createPerson(@RequestBody Bookstore bookstore) {
		return bookstoreRepository.save(bookstore);
	}

}
