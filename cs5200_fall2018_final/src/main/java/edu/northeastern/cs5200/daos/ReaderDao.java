package edu.northeastern.cs5200.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import edu.northeastern.cs5200.jpas.Reader;
import edu.northeastern.cs5200.jpas.ReaderRepository;





@RestController
@Controller
public class ReaderDao {
	@Autowired
	ReaderRepository readerRepository;
	@PostMapping("/api/test/reader")
	public Reader createPerson(@RequestBody Reader reader) {
		return readerRepository.save(reader);
	}

}
