import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useFirestore = () => {
  const toast = useToast();
  const {t} = useTranslation();

  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id (never used in this app).
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const checkInWatchlist = async (userID, movieID) => {
    const docRef = doc(db, "users", userID, "watchlist", movieID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const addToWatchlist = async (userID, movieID, data, setLoading) => {
    try {
      setLoading(true);
      if (await checkInWatchlist(userID, movieID)) {
        toast({
          title: t("error"),
          description: t("itemAlreadyInWatchlist"),
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
      await setDoc(doc(db, "users", userID, "watchlist", movieID), data);
      toast({
        title: `${data?.title}: ${t("addedToWatchlist")}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${t("error")}!`,
        description: t("errorOccurred"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log("error while adding document", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (userID, movieID) => {
    try {
      await deleteDoc(doc(db, "users", userID, "watchlist", movieID));
      toast({
        title: `${t("success")}!`,
        description: t("removedFromWatchlist"),
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${t("error")}!`,
        description: t("errorOccurred"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log("error while deleting document", error);
    }
  };

  const getWatchlist = useCallback(async (userID) => {
    const collectionRef = collection(db, "users", userID, "watchlist");
    const querySnapShot = await getDocs(collectionRef);
    const data = querySnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  // Favorite
  const checkInFavorite = async (userID, movieID) => {
    const docRef = doc(db, "users", userID, "favorite", movieID);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const addToFavorite= async (userID, movieID, data) => {
    try {
      if (await checkInFavorite(userID, movieID)) {
        toast({
          title: `${t("error")}!`,
          description: t("itemAlreadyInFavorite"),
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
      await setDoc(doc(db, "users", userID, "favorite", movieID), data);
      toast({
        title: `${data?.title}: ${t("addedToFavorite")}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${t("error")}!`,
        description: t("errorOccurred"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log("error while adding document", error);
    }
  };
  const removeFromFavorite = async (userID, movieID) => {
    try {
      await deleteDoc(doc(db, "users", userID, "favorite", movieID));
      toast({
        title: `${t("success")}!`,
        description: t("removedFromFavorite"),
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${t("error")}!`,
        description: t("errorOccurred"),
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log("error while deleting document", error);
    }
  };
  const getFavorite = useCallback(async (userID) => {
    const collectionRef = collection(db, "users", userID, "favorite");
    const querySnapShot = await getDocs(collectionRef);
    const data = querySnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addDocument,
    addToWatchlist,
    checkInWatchlist,
    removeFromWatchlist,
    getWatchlist,
    removeFromFavorite,
    addToFavorite,
    checkInFavorite,
    getFavorite,
  };
};
