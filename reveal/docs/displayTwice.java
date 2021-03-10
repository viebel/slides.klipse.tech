class MemberData {
    private boolean blocked;
    public Member() {
        this.blocked = false;
    }
    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }
    public boolean isBlocked() {
        return this.blocked;
    }
}

class MemberBehaviour {
    static restrictedAction(MemberData member) {
        if(!member.isBlocked()) {
            System.out.println(member.isBlocked());
        }
    }
}

class AuthorData {
    private String firstName;
    private String lastName;
    // setters
    // getters
}

class MemberCode {
    static borrow(MemberData member, String bookId) {
        if(!member.isBlocked()) {
            System.out.println("The book is yours!");
        }
    }
}

public record AuthorData (String firstName,
                          String lastName) {}

class AuthorCode {
    static String fullName(AuthorData author) {
        return author.firstName() +
            " " +
            author.lastName();
    }
}

var isaacAsimov = new AuthorData("Isaac", "Asimov");
AuthorCode.fullName(isaacAsimov); // "Isaac Asimov"

class AuthorCode {
    static AuthorData capitalizeLastName(AuthorData author) {
        author.setFirstName(author.firstName().toUpperCase());
        return author;
    }
}

var asimov = new AuthorData("Isaac", "Asimov");
var asimov2 = AuthorCode.toUpperLastName(asimov);
asimov2.lastName() // "ASIMOV"
asimov.lastName() // ??

