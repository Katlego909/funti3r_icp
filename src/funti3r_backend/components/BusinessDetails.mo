import List "mo:base/List";

module {
   public  class BusinessDetails (_name: Text, _email: Text, _phone: Text, _location: Text, _socials: List.List<Text>, _description: Text) {
    var name = _name;
    var email = _email;
    var phone = _phone;
    var location = _location;
    var socials = _socials; // contains links to the users socials
    var description = _description;

    // Getters
    public func getName(): Text { name };
    public func getEmail(): Text { email };
    public func getPhone(): Text { phone };
    public func getLocation(): Text { location };
    public func getSocials(): List.List<Text> { socials };
    public func getDescription(): Text { description };

    // Setters
    public func setName(newName: Text) { name := newName };
    public func setEmail(newEmail: Text) { email := newEmail };
    public func setPhone(newPhone: Text) { phone := newPhone };
    public func setLocation(newLocation: Text) { location := newLocation };
    public func setSocials(newSocials: List.List<Text>) { socials := newSocials };
    public func setDescription(newDescription: Text) { description := newDescription };
}

}