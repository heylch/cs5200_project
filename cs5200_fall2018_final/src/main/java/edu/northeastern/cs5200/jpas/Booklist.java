package edu.northeastern.cs5200.jpas;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "booklist")
public class Booklist {
	
	@Id  
	@GeneratedValue
	   (strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
//	private int userId;
	@OneToMany(mappedBy = "booklist")
	private List<Book> blist;
	
	@ManyToOne()
	private User user;

	
	public Booklist(){
//		blist = new ArrayList<Book>();
	}
	
	public Booklist(String name, int userId){
		this.name = name;
//		this.userId = userId;
//		blist = new ArrayList<Book>();
	}
	
	public User getUser() {
		return user;
	}

	public void setUserId(User user) {
		this.user = user;
	}	
//	public int getUserId() {
//		return userId;
//	}
//
//	public void setUserId(int userId) {
//		this.userId = userId;
//	}	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
//	public void setBooklist(List<Book> blist) {
//		this.blist=blist;
//	}
//	
//	public List<Book> getBooklist(){
//		return this.blist;
//	}
//	public void addBooklist(Book blist) {
//		this.blist.add(blist);
//	}

}
