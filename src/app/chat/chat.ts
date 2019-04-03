//defuinition of the interface

export interface ChatMessage {
  chatId?:string, //? is for optional
  message:string,
 createdOn : Date,
 receiverId : string,
 receiverName: string,
 senderId : string,
 senderName : string,

}