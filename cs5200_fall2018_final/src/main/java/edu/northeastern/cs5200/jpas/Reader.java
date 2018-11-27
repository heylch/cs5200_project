package edu.northeastern.cs5200.jpas;

import java.sql.Date;
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
@Table(name = "reader")
public class Reader extends User{

	   @Id  
	   @GeneratedValue
	      (strategy=GenerationType.IDENTITY)
	   private int id;
	   private String firstName;
	   private long balance;
	   private Date dob;
	   
//	   @OneToMany(mappedBy = "user")
//	   @JsonIgnore
//	   private List<Booklist> booklist;
	   public Reader() {
			super();
//			booklist = new ArrayList<Booklist>();
		}
	   
	   public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
	   public Reader(String username, String password,String email,String firstName,long balance) {
			super(username,password,email);
			this.firstName=firstName;
			this.balance=balance;
//			booklist = new ArrayList<Booklist>();
		}

		public String getName() {
			return firstName;
		}

		public void setName(String firstName) {
			this.firstName = firstName;
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

