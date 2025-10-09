"use client";
import React, { useContext, useEffect, useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Notification } from "@repo/ui/Notification";

export default function Vlogger() {
  const { profileData } = useProfile();
  const [isVlogger, setIsVlogger] = useState(profileData?.user?.isVlogger);
  return (
    <>
      {isVlogger ? <Main /> : <RegisterVlogger setIsVlogger={setIsVlogger} />}
    </>
  );
}

function RegisterVlogger({ setIsVlogger }: any) {
  const profileData = useProfile().profileData;
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState("");
  const [bio, setBio] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [channelName, setChannelName] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function handleRegister() {
    const userId = profileData?.user?.id;
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/registration/vlogger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bio, channelUrl, channelName, isActive }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsVlogger(true); // Update the isVlogger status after successful registration
      } else {
        console.error("Error registering vlogger:", response.statusText);
        setMsg("Error registering vlogger");
        setNotification(true);
      }
    } catch (error) {
      console.error("Error registering vlogger:", error);
      setMsg("Error registering vlogger");
      setNotification(true);
    }
  }

  return (
    <div className="p-4">
      {notification && (
        <Notification
          type="error"
          message={msg}
          onClose={() => setNotification(false)}
        />
      )}

      <h2 className="text-2xl font-bold mb-4">You are Not Registered as a Vlogger</h2>
      <p>Please complete your Vlogger profile registration.</p>
      <form className="mt-4 space-y-4">
        <Input
          type="text"
          placeholder="Channel Name"
          className="w-full p-2"
          onChange={setChannelName}
        />
        <Input
          type="text"
          placeholder="Channel Url"
          className="w-full p-2"
          onChange={setChannelUrl}
        />
        <Input
          type="text"
          placeholder="Bio"
          className="w-full p-2"
          onChange={setBio}
        />
        {/* Align checkbox + label */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="Active?"
            className="w-5 h-5 accent-blue-600 cursor-pointer"
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label
            htmlFor="Active?"
            className="text-lg text-white font-medium cursor-pointer"
          >
            Is Active
          </label>
        </div>

        <Button
          className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold"
          onClick={handleRegister}
        >
          Register as Vlogger
        </Button>
      </form>
    </div>
  );
}

interface VloggerProfile {
  id: number;
  userId: number;
  channelName: string
  channelUrl: string
  subscribers: number
  bio: string;
  isActive: boolean;
}

interface Posts {
  id: number
  userId: number
  title: string
  content: string
  mediaUrl: string
  place: string
  type: string
  upvotes: number
  downvotes: number
  createdAt: string
}

function Main() {
  const { profileData } = useProfile();
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState("");
  const [vloggerProfile, setVloggerProfile] = useState<VloggerProfile | null>(null);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [upload, setupload] = useState(false);
  useEffect(() => {
    fetchVloggerData();
    fetchPosts();
  }, [upload]);

  async function fetchPosts() {
    try {
      console.log(profileData?.user?.id);

      const response = await fetch(`http://localhost:3001/api/vlogger/posts?userId=${profileData?.user?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.log(data);

      } else {
        setNotification(true);
        setMsg("Error fetching vlogger Posts");
        console.error("Error fetching vlogger Posts:", response.statusText);
      }
    }
    catch (error) {
      setNotification(true);
      setMsg("Error fetching vlogger Posts");
      console.error("Error fetching vlogger Posts:", error);
    }
  }

  async function fetchVloggerData() {
    const userId = profileData?.user?.id;
    // console.log(userId);

    if (!userId) {
      setNotification(true);
      setMsg("User ID is not available.");
      console.error("User ID is not available.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/user/details/vlogger?userId=${profileData?.user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setVloggerProfile(data);
        // Process the vlogger data as needed
      } else {
        setNotification(true);
        setMsg("Error fetching vlogger data");
        console.error("Error fetching vlogger data:", response.statusText);
      }
    } catch (error) {
      setNotification(true);
      setMsg("Error fetching vlogger data");
      console.error("Error fetching vlogger data:", error);
    }
  }

  async function uploadPost() {
    setupload(true);
  }

  return (
    <>
      <div className="p-4">
        {notification && (
          <Notification
            type="error"
            message={msg}
            onClose={() => setNotification(false)}
          />
        )}
        {vloggerProfile ? (
          <div>
            <div className="flex space-x-180">
              <p className="text-blue-400 text-4xl font-bold">{vloggerProfile?.channelName}</p>
              <div className="p-2 bg-red-400 rounded-lg inline-block hover:bg-red-500">
                <p className="text-white font-semibold">
                  Subscribers: {vloggerProfile?.subscribers}
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-400 font-medium mb-5">{vloggerProfile.bio}</p>
            {vloggerProfile?.channelUrl && <p className="text-md text-gray-200 font-medium">
              Channel Link:{" "}
              <a
                href={vloggerProfile?.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-300 hover:text-blue-400 underline"
              >
                {vloggerProfile?.channelUrl}
              </a>
            </p>
            }
          </div>
        ) : (
          <p className="text-lg">No vlogger profile found.</p>
        )}
        <hr className="mt-5 mb-5"></hr>
        <div>
          <div className="flex space-x-230">
            <p className="text-white text-3xl font-bold">Posts</p>
            <Button className="p-2 bg-blue-400 rounded-lg inline-block hover:bg-blue-500 text-white font-semibold" onClick={uploadPost}>
              Upload
            </Button>
          </div>
        </div>
        {upload ? (
          <Upload setupload={setupload} />
        ) : posts.length > 0 ? (
          <div className="flex flex-wrap items-center space-y-6 mt-10 space-x-4">
            {posts.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-4">No posts available.</p>
        )}

      </div>
    </>
  );
}

function Card({ post }: { post: Posts }) {
  const { title, content, mediaUrl, type, createdAt, upvotes, downvotes,place } = post;

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl shadow-md overflow-hidden w-60 flex-shrink-0 border border-gray-700">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={mediaUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"  // remove object-cover for fit image in div
        />
      </div>

      {/* Icons (Upvote / Downvote) */}
      <div className="flex items-center justify-between p-2">
        <div className="flex space-x-4">
          <span className="flex items-center space-x-1 text-green-400">
            👍 <span>{upvotes}</span>
          </span>
          <span className="flex items-center space-x-1 text-red-400">
            👎 <span>{downvotes}</span>
          </span>
        </div>
        <span className="text-gray-400 text-xs">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Title */}
      <div className="px-2 pb-1 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-white truncate">{title}</h2>
        <h2 className="text-xs font-semibold text-gray-400 truncate">📍{place}</h2>
      </div>
      
      <div className="px-2 pb-2">
        <p className="text-gray-300 text-sm line-clamp-3">{content}</p>
      </div>
    </div>
  );
}

function Upload({setupload}: any) {
  const { profileData } = useProfile();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");

  async function handleUploadToCloudinary(): Promise<string | null> {
    if (!media) {
      alert("Please select a file first.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", "heritageHub"); //  your preset
    formData.append("cloud_name", "dpcdpjm8a"); //  your cloud name

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpcdpjm8a/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary Upload:", data);
      return data.url;
    } catch (error) {
      console.error(" Upload failed:", error);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !content || !type || !place || !media) {
      alert("Please fill all fields!");
      return;
    }

    const cloudinaryUrl = await handleUploadToCloudinary();
    console.log(cloudinaryUrl);

    if (!cloudinaryUrl) return;

    const payload = {
      title,
      content,
      type,
      place,
      mediaUrl: cloudinaryUrl,
      userId: profileData?.user?.id, // optional if needed
    };

    // console.log(payload);

    try {
      const res = await fetch("http://localhost:3001/api/vlogger/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(" Post Saved:", data);
      alert("Post uploaded successfully!");
      setupload(false);
    } catch (error) {
      console.error(" Backend error:", error);
      alert("Failed to upload post.");
    }
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      {/* Title */}
      <Input
        type="text"
        placeholder="Title"
        className="w-full p-2"
        onChange={setTitle}
      />

      <Input
        type="text"
        placeholder="Place"
        className="w-full p-2"
        onChange={setPlace}
      />

      {/* Description */}
      <Input
        type="text"
        placeholder="Description of post"
        className="w-full p-2"
        onChange={setContent}
      />

      {/* Media upload */}
      <label htmlFor="media-upload" className="text-blue-300 font-medium">
        Upload Media (jpg, png, max 100KB):
      </label>
      <input
        id="media-upload"
        type="file"
        accept=".jpg, .png"
        placeholder="Choose an image file"
        className="w-full p-2 text-blue-400 bg-gray-800 rounded-md"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > 100 * 1024) {
              alert("File size exceeds 100KB. Please upload a smaller file.");
              e.target.value = "";
            } else {
              setMedia(file);
            }
          }
        }}
      />

      {/* Type selection */}
      <div className="flex flex-col space-y-2">
        <label className="text-blue-300 font-medium">Choose Type:</label>
        <div className="flex space-x-4">
          {["vlog", "guideInfo", "vendorInfo"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <Button
        className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold text-white"
      >
        Upload
      </Button>
    </form>
  );
}
