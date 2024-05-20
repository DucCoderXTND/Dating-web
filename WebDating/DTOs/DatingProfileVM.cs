﻿using WebDating.Entities.ProfileEntities;

namespace WebDating.DTOs
{
    public class DatingProfileVM
    {
        public int Id { get; set; }
        public int UserId {  get; set; }
        public Gender DatingObject { get; set; }
        public Height Height { get; set; }
        public Provice WhereToDate { get; set; }
        public int DatingAgeFrom { get; set; }
        public int DatingAgeTo { get; set; }
        public IEnumerable<UserInterestVM> UserInterests { get; set; }
    }

    public class DatingProfileDto
    {
        public int Id { get; set; }
        // Đối tượng hẹn hò
        public string DatingObject { get; set; }
        public Gender DatingObjectCode { get; set; }
        // Chiều cao
        public string Height { get; set; }
        public Height HeightCode { get; set; }
        // Địa điểm muốn hẹn hò - Tỉnh thành
        public string WhereToDate { get; set; }
        public Provice WhereToDateCode { get; set; }
        public int DatingAgeFrom { get; set; }
        public int DatingAgeTo { get; set; }
        // Sở thích
        public List<UserInterestDto> UserInterests { get; set; }
    }
}
