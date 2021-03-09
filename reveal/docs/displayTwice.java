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

