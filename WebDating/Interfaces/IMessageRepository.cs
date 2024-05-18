﻿
using WebDating.DTOs;
using WebDating.Entities.MessageEntities;
using WebDating.Helpers;

namespace WebDating.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        Task DeleteAllMessageByUserId(int currentId, int otherId);
        //void DeleteMessageParams(MessageDeleteParams messageDeleteParams);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);


        void AddGroup(Group group);
        void RemoveConnection(Connection connection);
        Task<Connection> GetConnection(string connectionId);
        Task<Group> GetMessageGroup(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
    }
}
