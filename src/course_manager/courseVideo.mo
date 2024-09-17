import courseTypes "../Types/courseTypes";
import Map "mo:map/Map";
import {ihash} "mo:map/Map";
import Cycles "mo:base/ExperimentalCycles";
import Prim "mo:prim";
import Nat64 "mo:base/Nat64";

actor class CourseVideo(unitName : Text, unitNumber : Nat) {

    var name = unitName;
    var number = unitNumber;
    var videoInfo : ?courseTypes.FileInfo  = null;  
    var video = Map.new<Nat, [Nat8]>();
    var videoBanner  = Map.new<Nat, [Nat8]>();
    var videoBannerInfo : ?courseTypes.FileInfo = null;

    public query func getUnitDetails() : async courseTypes.UnitDetails {
        return {
            name;
            number;
        };
    };

    public query func getVideoInfo () : async ?courseTypes.FileInfo {
      return videoInfo;
    };

    public query func uploadVideoFileInfo(info : courseTypes.FileInfo) : async courseTypes.FileInfo {
       videoInfo := ?info;
       return info;
    };
    public query func getVideo(chunkId : Nat) : async [Nat8] {
         switch(Map.get(video, ihash, chunkId)) {
            case (null) { return []};
            case(?chunk) return chunk;
         }
    };

    public shared(msg) func uploadVideo(chunkId : Nat, chunk : [Nat8]) : async Bool {
        Map.set(video, ihash, chunkId, chunk);
       return true;
    };

    public query func getVideoBannerInfo () : async ?courseTypes.FileInfo {
      return videoBannerInfo;
    };

    public query func uploadVideoBannerFileInfo(info : courseTypes.FileInfo) : async courseTypes.FileInfo {
       videoBannerInfo := ?info;
       return info;
    };
    public query func getVideoBanner(chunkId : Nat) : async [Nat8] {
         switch(Map.get(videoBanner, ihash, chunkId)) {
            case (null) { return []};
            case(?chunk) return chunk;
         }
    };

    public shared(msg) func uploadVideoBanner(chunkId : Nat, chunk : [Nat8]) : async Bool {
        Map.set(videoBanner, ihash, chunkId, chunk);
       return true;
    };

      // cycles related
  public func getCurrentCycles() : async Nat {
    return Cycles.balance();
 };


 
   public shared func getCurrentHeapMemory():  async Nat64 {
        Nat64.fromNat(Prim.rts_heap_size());
    };

    public shared func getCurrentMemory(): async Nat64 {
        Nat64.fromNat(Prim.rts_memory_size());
    };

}