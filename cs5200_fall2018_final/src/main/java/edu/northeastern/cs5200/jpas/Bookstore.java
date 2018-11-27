package edu.northeastern.cs5200.jpas;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "bookstore")
public class Bookstore extends User{

	   @Id  
	   @GeneratedValue
	      (strategy=GenerationType.IDENTITY)
	   private int id;
	   private String name;
	   private long balance;
	   
//	   @OneToMany(mappedBy = "user")
//	   @JsonIgnore
//	   private List<Booklist> booklist;
//	   public Bookstore() {
//			super();
//			booklist = new ArrayList<Booklist>();
//		}
	   
	   public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
	   public Bookstore(String username, String password,String email,String name,long balance) {
			super(username,password,email);
			this.name=name;
			this.balance=balance;
//			booklist = new ArrayList<Booklist>();
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
		
		public long getBalance() {
			return balance;
		}

		public void setBalance(long balance) {
			this.balance = balance;
		}	
		
//		public void setBooklist(List<Booklist> booklist) {
//			this.booklist=booklist;
//		}
//		
//		public List<Booklist> getBooklist(){
//			return this.booklist;
//		}
//		public void addBooklist(Booklist booklist) {
//			this.booklist.add(booklist);
//		}
}

