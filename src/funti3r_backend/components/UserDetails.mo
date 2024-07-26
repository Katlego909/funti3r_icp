import List "mo:base/List";
import types "../../Types/types";

module  {
public class UserDetails (_name: Text, 
_email: Text, 
_phone: Text, 
_location: Text, 
_qualifications: List.List<Text>, 
_socials: List.List<Text>, 
_description: Text) {
    
    var name  = _name;
    var email = _email;
    var phone  = _phone;
    var location  = _location;
    var qualifications = _qualifications; // list of qualifications
    var socials = _socials; // contains links to the users socials
    var description = _description;
    var subscription: types.SubscriptionModel = #none;
    // Getters
    public func getName(): Text { name };
    public func getEmail(): Text { email };
    public func getPhone(): Text { phone };
    public func getLocation(): Text { location };
    public func getQualifications(): List.List<Text> { qualifications };
    public func getSocials(): List.List<Text> { socials };
    public func getDescription(): Text { description };
    public func getSubscription(): types.SubscriptionModel { subscription};

    // Setters
    public func setName(newName: Text) { name := newName };
    public func setEmail(newEmail: Text) { email := newEmail };
    public func setPhone(newPhone: Text) { phone := newPhone };
    public func setLocation(newLocation: Text) { location := newLocation };
    public func setQualifications(newQualifications: List.List<Text>) { qualifications := newQualifications };
    public func setSocials(newSocials: List.List<Text>) { socials := newSocials };
    public func setDescription(newDescription: Text) { description := newDescription };
       public func setSubscription(newSubscription: types.SubscriptionModel) {
        subscription := newSubscription;
    }
}
}