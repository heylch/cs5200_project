package edu.northeastern.cs5200.jpas;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "user")
public class User {
	
   @Id  
   @GeneratedValue
      (strategy=GenerationType.IDENTITY)
   private int id;
   private String username;
   private String password;
   private String email;
   
   @OneToMany(mappedBy = "user")
   @JsonIgnore
   private List<Booklist> booklists;
   
   public User() {
	   booklists = new ArrayList<Booklist>();
   }
   public User(String username,String password,String email) {
	   this.username = username;
	   this.password = password;
	   this.email = email;
	   booklists = new ArrayList<Booklist>();
   }
   public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public void setBooklist(List<Booklist> booklists) {
		this.booklists=booklists;
	}
	
	public List<Booklist> getBooklist(){
		return this.booklists;
	}
	public void addBooklist(Booklist booklist) {
		this.booklists.add(booklist);
	}
	
	public void set(User newPerson) {
		this.username = newPerson.username != null ?
				newPerson.username : this.username; 
		this.password = newPerson.password != null ?
				newPerson.password : this.password; 
		this.email = newPerson.email != null ?
				newPerson.email : this.email;
	}
}


