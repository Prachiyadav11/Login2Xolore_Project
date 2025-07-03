const token = "90935018|-31949211410799265|90958855";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
const jpdbBaseURL = "http://api.login2explore.com:5577";


let recordNumberToUpdate = null;

$(document).ready(function () {
  resetForm();

  $("#rollNo").on("change", function () {
    const rollNo = $("#rollNo").val().trim();
    if (rollNo === "") {
      alert("Please enter Roll No.");
      resetForm();
      return;
    }
    checkForRecord(rollNo);
  });

  $("#saveBtn").on("click", function () {
    if (validateForm()) saveStudentData();
  });

  $("#updateBtn").on("click", function () {
    if (validateForm()) updateStudentData();
  });

  $("#resetBtn").on("click", function () {
    resetForm();
  });
});

function resetForm() {
  $("#studentForm")[0].reset();
  $("#rollNo").prop("disabled", false).focus();
  $("#saveBtn, #updateBtn, #resetBtn").prop("disabled", true);
  $("#fullName, #studentClass, #birthDate, #address, #enrollDate").prop("disabled", true);
  recordNumberToUpdate = null;
}

function validateForm() {
  if ($("#rollNo").val().trim() === "") return alert("Roll No is required."), false;
  if ($("#fullName").val().trim() === "") return alert("Full Name is required."), false;
  if ($("#studentClass").val().trim() === "") return alert("Class is required."), false;
  if ($("#birthDate").val().trim() === "") return alert("Birth Date is required."), false;
  if ($("#address").val().trim() === "") return alert("Address is required."), false;
  if ($("#enrollDate").val().trim() === "") return alert("Enrollment Date is required."), false;
  return true;
}

function enableFormForInsert() {
  $("#saveBtn, #resetBtn").prop("disabled", false);
  $("#fullName, #studentClass, #birthDate, #address, #enrollDate").prop("disabled", false);
  $("#fullName").focus();
}

function enableFormForUpdate(data) {
  $("#updateBtn, #resetBtn").prop("disabled", false);
  $("#rollNo").prop("disabled", true);
  $("#fullName, #studentClass, #birthDate, #address, #enrollDate").prop("disabled", false);

  $("#fullName").val(data.FullName);
  $("#studentClass").val(data.Class);
  $("#birthDate").val(data.BirthDate);
  $("#address").val(data.Address);
  $("#enrollDate").val(data.EnrollmentDate);
  $("#fullName").focus();
}

function checkForRecord(rollNo) {
  const getRequest = {
    token,
    dbName,
    rel: relName,
    cmd: "GET_BY_KEY",
    key: rollNo
  };

  $.post(`${jpdbBaseURL}/api/irl`, JSON.stringify(getRequest), function (response) {
    if (response.data && response.data.record) {
      recordNumberToUpdate = response.data.rec_no; 
      enableFormForUpdate(response.data.record);
    } else {
      enableFormForInsert();
      recordNumberToUpdate = null;
    }
  }, "json").fail(() => {
    alert("Error while connecting to JPDB.");
  });
}

function saveStudentData() {
  const studentData = {
    RollNo: $("#rollNo").val(),
    FullName: $("#fullName").val(),
    Class: $("#studentClass").val(),
    BirthDate: $("#birthDate").val(),
    Address: $("#address").val(),
    EnrollmentDate: $("#enrollDate").val()
  };

  const putRequest = {
    token,
    dbName,
    rel: relName,
    cmd: "PUT",
    jsonStr: studentData,
    key: studentData.RollNo
  };

  $.post(`${jpdbBaseURL}/api/iml`, JSON.stringify(putRequest), function () {
    alert("Record saved successfully!");
    resetForm();
  }, "json").fail(() => {
    alert("Failed to save record.");
  });
}

function updateStudentData() {
  if (!recordNumberToUpdate) {
    alert("rec_no missing. Cannot update record.");
    return;
  }

  const updatedData = {
    RollNo: $("#rollNo").val(),
    FullName: $("#fullName").val(),
    Class: $("#studentClass").val(),
    BirthDate: $("#birthDate").val(),
    Address: $("#address").val(),
    EnrollmentDate: $("#enrollDate").val()
  };

  const updateRequest = {
    token,
    dbName,
    rel: relName,
    cmd: "UPDATE",
    record: recordNumberToUpdate,
    jsonStr: JSON.stringify(updatedData)
  };

  $.post(`${jpdbBaseURL}/api/iml`, JSON.stringify(updateRequest), function () {
    alert("Record updated successfully!");
    resetForm();
  }, "json").fail(() => {
    alert("Failed to update record.");
  });
}
