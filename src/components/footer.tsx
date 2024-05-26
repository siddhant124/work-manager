"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-red-100 h-40 py-2 px-3 flex flex-col justify-around items-center">
      <div className="footer">
        <p className="text-xs justify-center">
          © 2024 TaskMaster. All rights reserved.
        </p>
      </div>
      <div>
        <p className=" justify-center text-xs">
          TaskMaster is your ultimate productivity partner, designed to help you
          create, manage, and track your tasks with ease. Stay organized, meet
          your deadlines, and achieve your goals effortlessly with our intuitive
          task management tools. Join our community of productivity enthusiasts
          and take control of your day, one task at a time. Have questions or
          need support? Contact us.
        </p>
      </div>
      <hr className="w-full border-gray-300 mt-5" />
      <div className="w-full">
        <p className="text-center font-semibold justify-center text-balance">
          Connect with us:
        </p>
        <div className="flex flex-row justify-center space-x-4">
          <a href="https://www.facebook.com/" target="_blank">
            <i className="fab fa-facebook-f text-blue-500" />
          </a>
          <a href="https://wa.me/9589014577" target="_blank">
            <i className="fab fa-whatsapp text-green-500" />
          </a>
          <a href="https://twitter.com/" target="_blank">
            <i className="fab fa-twitter text-blue-700" />
          </a>
          <a href="tel:+91-9589014577">
            <i className="fas fa-phone" />
          </a>
        </div>
      </div>
    </footer>
  );
};
