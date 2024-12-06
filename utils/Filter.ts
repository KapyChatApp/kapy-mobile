import { FriendBoxProps } from "@/types/friend";

export const groupFriendsByFirstLetter = (
  friends: FriendBoxProps[]
): FriendBoxProps[][] => {
  const groupedFriends: { [key: string]: FriendBoxProps[] } = {};

  friends.forEach((friend) => {
    const lastNameWords = friend.lastName?.split(" ").reverse();
    const firstLetter = lastNameWords![0][0].toUpperCase()!
    if (!groupedFriends[firstLetter]) {
      groupedFriends[firstLetter] = [];
    }
    groupedFriends[firstLetter].push(friend);
  });

  return Object.values(groupedFriends);
};

export const sortFriendsAscending = (
    groupedFriends: FriendBoxProps[][]
  ): FriendBoxProps[][] => {

    const copiedGroupedFriends = [...groupedFriends];

    return copiedGroupedFriends.sort((a, b) => {
      const aLetter = a[0].lastName?.split(" ").reverse()[0][0].toUpperCase();
      const bLetter = b[0].lastName?.split(" ").reverse()[0][0].toUpperCase();
      return aLetter!.localeCompare(bLetter!);
    });
  };
  
  export const sortFriendsDescending = (
    groupedFriends: FriendBoxProps[][]
  ): FriendBoxProps[][] => {
  
    const copiedGroupedFriends = [...groupedFriends];
  
    return copiedGroupedFriends.sort((a, b) => {
        const aLetter = a[0].lastName?.split(" ").reverse()[0][0].toUpperCase();
        const bLetter = b[0].lastName?.split(" ").reverse()[0][0].toUpperCase();
        return bLetter!.localeCompare(aLetter!);
    });
  };