import Nat "mo:base/Nat";

actor {
	stable var counter : Nat = 0;

	public func increment() : async Nat {
		counter += 1;
		return counter;
	};

	public query func getCount() : async Nat {
		return counter;
	};

	// public func reset() : async () {
	//     counter := 0;
	// };

	public query func MultyplyCount(times : Nat) : async Nat {
		return times * counter;
	};
};
