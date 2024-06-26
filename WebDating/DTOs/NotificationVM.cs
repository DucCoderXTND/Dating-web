﻿using WebDating.Entities.NotificationEntities;

namespace WebDating.DTOs
{
    public class NotificationVM
    {
        public int Id { get; set; }
        public int? PostId { get; set; }
        public int? UserId { get; set; }
        public string Content { get; set; }
        public NotificationStatus Status { get; set; } = NotificationStatus.Unread;
        public NotificationType Type { get; set; } = NotificationType.ReactionPost;
        public int? DatingRequestId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
