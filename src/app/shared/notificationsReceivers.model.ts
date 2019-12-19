export class NotificationsReceivers {
  idnotificationReceiver: String;
  idplayerReceiverFK: String;
  idnotificationFK: String;
  idguildFK: String;
  notificationSeen: String;


  constructor(idnotificationReceiver: String, idplayerReceiverFK: String, idnotificationFK: String, idguildFK: String, notificationSeen: String) {
    this.idnotificationReceiver = idnotificationReceiver;
    this.idplayerReceiverFK = idplayerReceiverFK;
    this.idnotificationFK = idnotificationFK;
    this.idguildFK = idguildFK;
    this.notificationSeen = notificationSeen;
  }
}