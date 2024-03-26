import { useState, useCallback, useMemo } from "react";

// Custom hook for handling notifications (success and error messages)
export const useNotificationHandling = (initialErrorMessages = []) => {
  // State to manage the snackbar visibility
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // State to hold the array of error messages
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);
  // State to track the current index of error messages being displayed
  const [currentErrorIndex, setCurrentErrorIndex] = useState(0);
  // State to manage alert information like message and severity
  const [alertInfo, setAlertInfo] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Function to handle success notifications
  const handleSuccess = useCallback((message) => {
    setAlertInfo({
      open: true,
      message: message,
      severity: "success",
    });
  }, []);

  // Function to handle errors by extracting error messages and displaying them
  const handleError = useCallback((error) => {
    const extractedErrors = extractErrorMessages(error.response.data.errors);
    setErrorMessages(extractedErrors);
    setOpenSnackbar(true);
    setCurrentErrorIndex(0);
  }, []);

  // Function to extract error messages from an error object
  const extractErrorMessages = useCallback((errorsObj) => {
    let messages = [];
    for (let key in errorsObj) {
      const errorMessagesForKey = errorsObj[key].map(
        (error) => `${key}: ${error}`
      );
      messages = [...messages, ...errorMessagesForKey];
    }
    return messages;
  }, []);

  // Function to handle the closure of the snackbar, moving to next message if exists
  const handleCloseSnackbar = useCallback(() => {
    if (currentErrorIndex < errorMessages.length - 1) {
      // Move to the next message
      setCurrentErrorIndex((currentIndex) => currentIndex + 1);
    } else {
      // No more messages to display, hide the snackbar
      setOpenSnackbar(false);
      setCurrentErrorIndex(0);
    }
  }, [currentErrorIndex, errorMessages.length]);

  // Memoize the return value to avoid unnecessary re-renders
  return useMemo(
    () => ({
      openSnackbar,
      setOpenSnackbar,
      errorMessages,
      setErrorMessages,
      currentErrorIndex,
      setCurrentErrorIndex,
      alertInfo,
      setAlertInfo,
      handleSuccess,
      handleError,
      extractErrorMessages,
      handleCloseSnackbar,
    }),
    [
      openSnackbar,
      errorMessages,
      currentErrorIndex,
      alertInfo,
      handleSuccess,
      handleError,
      extractErrorMessages,
      handleCloseSnackbar,
    ]
  );
};
