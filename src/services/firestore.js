import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useToast } from "@chakra-ui/react";

export const useFirestore = () => {
  const toast = useToast();

  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const checkInWatchlist = async (userID, movieID) => {
    const docRef = doc(db, "users", userID, "watchlist", movieID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };
  const addToWatchlist = async (userID, movieID, data) => {
    try {
      if (await checkInWatchlist(userID, movieID)) {
        toast({
          title: "Error",
          description: "This item is already in watchlist",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
      await setDoc(doc(db, "users", userID, "watchlist", movieID), data);
      toast({
        title: "Added to Watchlist",
        description: `${data?.title} has been added to your watchlist.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log("error adding document", error);
    }
  };

  return { addDocument, addToWatchlist };
};
