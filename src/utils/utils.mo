import Sha256 "mo:sha2/Sha256";
import Text "mo:base/Text";
import Blob "mo:base/Blob";

module {
  public func generateRandomId() : Blob {
    Sha256.fromBlob(#sha256, "hello")
  }
}