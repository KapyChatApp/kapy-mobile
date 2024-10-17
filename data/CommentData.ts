export const commentsData = [
    {
      id: 1,
      user: "Alice",
      content: "This is the first comment.",
      time: "12:00",
      replies: [
        {
          id: 2,
          user: "Bob",
          content: "This is a reply to the first comment.",
          time: "12:05",
          replies: [
            {
              id: 3,
              user: "Charlie",
              content: "This is a nested reply.",
              time: "12:10",
              replies: [
                {
                  id: 7,
                  user: "David",
                  content: "This is a reply to Charlie's reply.",
                  time: "12:15",
                  replies: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      user: "Dave",
      content: "This is another top-level comment.",
      time: "12:15",
      replies: [
        {
          id: 5,
          user: "Eve",
          content: "Replying to Dave's comment.",
          time: "12:20",
          replies: [
            {
              id: 8,
              user: "Grace",
              content: "Replying to Eve's reply.",
              time: "12:25",
              replies: [],
            },
          ],
        },
        {
          id: 9,
          user: "Frank",
          content: "Another reply to Dave's comment.",
          time: "12:30",
          replies: [],
        },
      ],
    },
    {
      id: 6,
      user: "Frank",
      content: "This is yet another comment.",
      time: "12:30",
      replies: [
        {
          id: 10,
          user: "Heidi",
          content: "This is a reply to Frank's comment.",
          time: "12:35",
          replies: [
            {
              id: 11,
              user: "Ivan",
              content: "Replying to Heidi's comment.",
              time: "12:40",
              replies: [],
            },
            {
              id: 12,
              user: "Judy",
              content: "Another reply to Heidi's comment.",
              time: "12:45",
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 13,
      user: "Mallory",
      content: "New top-level comment.",
      time: "12:50",
      replies: [
        {
          id: 14,
          user: "Oscar",
          content: "Replying to Mallory.",
          time: "12:55",
          replies: [],
        },
        {
          id: 15,
          user: "Peggy",
          content: "Another reply to Mallory.",
          time: "13:00",
          replies: [],
        },
      ],
    },
  ];
  