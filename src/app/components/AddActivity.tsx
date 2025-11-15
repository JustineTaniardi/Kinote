// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";

// interface AddActivityProps {
//   isOpen: boolean;
//   onClose: () => void;
// }


// export default function AddActivity({ isOpen, onClose }: AddActivityProps) {
//   if (!isOpen) return null;
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [hariOpen, setHariOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [subcategoryOpen, setSubcategoryOpen] = useState(false);

//   const [hari, setHari] = useState<string[]>([]);

//   const days = [
//     "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
//   ];

//   const categories = [
//     "Akademik", "Pekerjaan", "Olahraga", "Kesehatan",
//     "Kerohanian", "Keterampilan", "Productivity"
//   ];

//   const subcategories = [
//     "IPA", "IPS", "DKK", "Project", "Presentasi", "Hobi", "Freelance"
//   ];

//   const toggleDay = (day: string) => {
//     setHari(prev =>
//       prev.includes(day)
//         ? prev.filter(d => d !== day)
//         : [...prev, day]
//     );
//   };

//   const clearAll = () => {
//     setTitle("");
//     setCategory("");
//     setSubcategory("");
//     setHari([]);
//     setDescription("");
//   };

//   return (
//     <AnimatePresence>
//       {/* WRAPPER AGAR ONCLICK OVERLAY BISA DI-CLOSE */}
//       <motion.div
//         className="fixed inset-0 z-40"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >

//         {/* OVERLAY */}
//         <div
//           className="absolute inset-0 bg-black/40"
//           onClick={onClose}
//         />

//         {/* SIDEBAR */}
//         <motion.div
//           onClick={(e) => e.stopPropagation()} // FIX: klik sidebar tidak menutup overlay
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ duration: 0.25, ease: "easeOut" }} // FIX: NO MORE BOUNCE
//           className="absolute top-0 right-0 h-screen w-[340px] bg-white shadow-xl p-6 overflow-y-auto z-50"
//         >

//           {/* CLOSE BUTTON */}
//           <button className="absolute top-5 right-5" onClick={onClose}>
//             ✕
//           </button>

//           {/* TITLE INPUT */}
//           <input
//             type="text"
//             placeholder="Activity Name"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full text-xl font-semibold outline-none mb-6 bg-transparent"
//           />

//           {/* GROUP 1 */}
//           <div className="space-y-3 mb-6">

//             {/* CATEGORY */}
//             <div>
//               <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                 <Image src="/img/add-activity/category_icon.png" width={18} height={18} alt="icon" />
//                 Category
//               </label>

//               <div
//                 onClick={() => setCategoryOpen(!categoryOpen)}
//                 className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//               >
//                 <span className="text-gray-600">{category || "Select Category"}</span>
//                 <span>▾</span>
//               </div>

//               {categoryOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="mt-2 bg-gray-50 border rounded-lg p-2"
//                 >
//                   {categories.map((c) => (
//                     <div
//                       key={c}
//                       className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
//                       onClick={() => {
//                         setCategory(c);
//                         setCategoryOpen(false);
//                       }}
//                     >
//                       {c}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>

//             {/* SUBCATEGORY */}
//             <div>
//               <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                 <Image src="/img/add-activity/subcategory_icon.png" width={18} height={18} alt="icon" />
//                 Sub Category
//               </label>

//               <div
//                 onClick={() => setSubcategoryOpen(!subcategoryOpen)}
//                 className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//               >
//                 <span className="text-gray-600">{subcategory || "Select Subcategory"}</span>
//                 <span>▾</span>
//               </div>

//               <AnimatePresence>
//                 {subcategoryOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="mt-2 bg-gray-50 border rounded-lg p-2"
//                   >
//                     {subcategories.map((c) => (
//                       <div
//                         key={c}
//                         className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
//                         onClick={() => {
//                           setSubcategory(c);
//                           setSubcategoryOpen(false);
//                         }}
//                       >
//                         {c}
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* GROUP 2 */}
//           <div className="space-y-3 mb-6">

//             {/* HARI MULTI-SELECT */}
//             <div>
//               <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                 <Image src="/img/add-activity/hari_icon.png" width={18} height={18} alt="icon" />
//                 Hari
//               </label>

//               <div
//                 onClick={() => setHariOpen(!hariOpen)}
//                 className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//               >
//                 <span className="text-gray-600">
//                   {hari.length ? hari.join(", ") : "Select Days"}
//                 </span>
//                 <span>▾</span>
//               </div>

//               <AnimatePresence>
//                 {hariOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="mt-2 bg-gray-50 border rounded-lg p-2"
//                   >
//                     {days.map(d => (
//                       <label
//                         key={d}
//                         className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
//                         onClick={() => toggleDay(d)}
//                       >
//                         <input type="checkbox" checked={hari.includes(d)} readOnly />
//                         {d}
//                       </label>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Repeat */}
//             <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//               <Image src="/img/add-activity/repeat_icon.png" width={20} height={20} alt="icon" />
//               <input type="text" placeholder="Repeat" className="flex-1 bg-transparent outline-none text-gray-600" />
//             </div>

//             {/* Total Time */}
//             <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//               <Image src="/img/add-activity/total_time_icon.png" width={20} height={20} alt="icon" />
//               <input type="text" placeholder="Total Time" className="flex-1 bg-transparent outline-none text-gray-600" />
//             </div>

//             {/* Break */}
//             <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//               <Image src="/img/add-activity/break_icon.png" width={20} height={20} alt="icon" />
//               <input type="text" placeholder="Break" className="flex-1 bg-transparent outline-none text-gray-600" />
//             </div>
//           </div>

//           {/* GROUP 3 */}
//           <div className="mb-24">
//             <label className="text-sm font-medium mb-1 flex items-center gap-2">
//               Add Description
//             </label>

//             <textarea
//               placeholder="Description..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full bg-gray-50 border rounded-lg p-3 h-24 resize-none text-gray-600 outline-none"
//             />
//           </div>

//           {/* TRASH CAN */}
//           <button onClick={clearAll} className="absolute bottom-6 right-6">
//             <Image src="/img/add-activity/trashcan_icon.png" width={26} height={26} alt="trash" />
//           </button>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }




// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";

// interface AddActivityProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function AddActivity({ isOpen, onClose }: AddActivityProps) {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [hariOpen, setHariOpen] = useState(false);
//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [subcategoryOpen, setSubcategoryOpen] = useState(false);
//   const [hari, setHari] = useState<string[]>([]);

//   const days = [
//     "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
//   ];

//   const categories = [
//     "Akademik", "Pekerjaan", "Olahraga", "Kesehatan",
//     "Kerohanian", "Keterampilan", "Productivity"
//   ];

//   const subcategories = [
//     "IPA", "IPS", "DKK", "Project", "Presentasi", "Hobi", "Freelance"
//   ];

//   const toggleDay = (day: string) => {
//     setHari(prev =>
//       prev.includes(day)
//         ? prev.filter(d => d !== day)
//         : [...prev, day]
//     );
//   };

//   const clearAll = () => {
//     setTitle("");
//     setCategory("");
//     setSubcategory("");
//     setHari([]);
//     setDescription("");
//   };
  
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-40"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={onClose}
//           />

//           {/* Sidebar */}
//           <motion.div
//             onClick={(e) => e.stopPropagation()}
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ duration: 0.25, ease: "easeOut" }}
//             className="absolute top-0 right-0 h-screen w-[340px] bg-white shadow-xl p-6 overflow-y-auto z-50"
//           >
//             {/* CLOSE BUTTON */}
//             <button className="absolute top-5 right-5" onClick={onClose}>
//               ✕
//             </button>

//             {/* TITLE INPUT */}
//             <input
//               type="text"
//               placeholder="Activity Name"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full text-xl font-semibold outline-none mb-6 bg-transparent"
//             />

//             {/* GROUP 1 */}
//               <div className="space-y-3 mb-6">

//                 {/* CATEGORY */}
//                 <div>
//                   <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                     <Image src="/img/add-activity/category_icon.png" width={18} height={18} alt="icon" />
//                     Category
//                   </label>

//                   <div
//                     onClick={() => setCategoryOpen(!categoryOpen)}
//                     className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//                   >
//                     <span className="text-gray-600">{category || "Select Category"}</span>
//                     <span>▾</span>
//                   </div>

//                   {categoryOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="mt-2 bg-gray-50 border rounded-lg p-2"
//                     >
//                       {categories.map((c) => (
//                         <div
//                           key={c}
//                           className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
//                           onClick={() => {
//                             setCategory(c);
//                             setCategoryOpen(false);
//                           }}
//                         >
//                           {c}
//                         </div>
//                       ))}
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* SUBCATEGORY */}
//                 <div>
//                   <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                     <Image src="/img/add-activity/subcategory_icon.png" width={18} height={18} alt="icon" />
//                     Sub Category
//                   </label>

//                   <div
//                     onClick={() => setSubcategoryOpen(!subcategoryOpen)}
//                     className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//                   >
//                     <span className="text-gray-600">{subcategory || "Select Subcategory"}</span>
//                     <span>▾</span>
//                   </div>

//                   <AnimatePresence>
//                     {subcategoryOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="mt-2 bg-gray-50 border rounded-lg p-2"
//                       >
//                         {subcategories.map((c) => (
//                           <div
//                             key={c}
//                             className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
//                             onClick={() => {
//                               setSubcategory(c);
//                               setSubcategoryOpen(false);
//                             }}
//                           >
//                             {c}
//                           </div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* GROUP 2 */}
//               <div className="space-y-3 mb-6">

//                 {/* HARI MULTI-SELECT */}
//                 <div>
//                   <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                     <Image src="/img/add-activity/hari_icon.png" width={18} height={18} alt="icon" />
//                     Hari
//                   </label>

//                   <div
//                     onClick={() => setHariOpen(!hariOpen)}
//                     className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
//                   >
//                     <span className="text-gray-600">
//                       {hari.length ? hari.join(", ") : "Select Days"}
//                     </span>
//                     <span>▾</span>
//                   </div>

//                   <AnimatePresence>
//                     {hariOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="mt-2 bg-gray-50 border rounded-lg p-2"
//                       >
//                         {days.map(d => (
//                           <label
//                             key={d}
//                             className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
//                             onClick={() => toggleDay(d)}
//                           >
//                             <input type="checkbox" checked={hari.includes(d)} readOnly />
//                             {d}
//                           </label>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Repeat */}
//                 <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//                   <Image src="/img/add-activity/repeat_icon.png" width={20} height={20} alt="icon" />
//                   <input type="text" placeholder="Repeat" className="flex-1 bg-transparent outline-none text-gray-600" />
//                 </div>

//                 {/* Total Time */}
//                 <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//                   <Image src="/img/add-activity/total_time_icon.png" width={20} height={20} alt="icon" />
//                   <input type="text" placeholder="Total Time" className="flex-1 bg-transparent outline-none text-gray-600" />
//                 </div>

//                 {/* Break */}
//                 <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
//                   <Image src="/img/add-activity/break_icon.png" width={20} height={20} alt="icon" />
//                   <input type="text" placeholder="Break" className="flex-1 bg-transparent outline-none text-gray-600" />
//                 </div>
//               </div>

//               {/* GROUP 3 */}
//               <div className="mb-24">
//                 <label className="text-sm font-medium mb-1 flex items-center gap-2">
//                   Add Description
//                 </label>

//                 <textarea
//                   placeholder="Description..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full bg-gray-50 border rounded-lg p-3 h-24 resize-none text-gray-600 outline-none"
//                 />
//               </div>

//               {/* TRASH CAN */}
//               <button onClick={clearAll} className="absolute bottom-6 right-6">
//                 <Image src="/img/add-activity/trashcan_icon.png" width={26} height={26} alt="trash" />
//               </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }







"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddActivity({ isOpen, onClose }: AddActivityProps) {
  const [render, setRender] = useState(false);

  // Control mount/unmount with delay for exit animation
  useEffect(() => {
    if (isOpen) setRender(true);
    else {
      // Delay unmount to allow exit animation
      setTimeout(() => setRender(false), 250);
    }
  }, [isOpen]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [hariOpen, setHariOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [hari, setHari] = useState<string[]>([]);

  const days = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
  const categories = ["Akademik","Pekerjaan","Olahraga","Kesehatan","Kerohanian","Keterampilan","Productivity"];
  const subcategories = ["IPA","IPS","DKK","Project","Presentasi","Hobi","Freelance"];

  const toggleDay = (day: string) => {
    setHari(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const clearAll = () => {
    setTitle("");
    setCategory("");
    setSubcategory("");
    setHari([]);
    setDescription("");
  };

  return (
    <AnimatePresence>
      {render && (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

          {/* SIDEBAR */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-0 right-0 h-screen w-[340px] bg-white shadow-xl p-6 overflow-y-auto z-50"
          >
            {/* CLOSE BUTTON */}
            <button className="absolute top-5 right-5" onClick={onClose}>✕</button>

            {/* =================== YOUR INPUTS =================== */}
            <input
              type="text"
              placeholder="Activity Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-semibold outline-none mb-6 bg-transparent"
            />

            {/* GROUP 1 */}
              <div className="space-y-3 mb-6">

                {/* CATEGORY */}
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Image src="/img/add-activity/category_icon.png" width={18} height={18} alt="icon" />
                    Category
                  </label>

                  <div
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <span className="text-gray-600">{category || "Select Category"}</span>
                    <span>▾</span>
                  </div>

                  {categoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2 bg-gray-50 border rounded-lg p-2"
                    >
                      {categories.map((c) => (
                        <div
                          key={c}
                          className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => {
                            setCategory(c);
                            setCategoryOpen(false);
                          }}
                        >
                          {c}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* SUBCATEGORY */}
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Image src="/img/add-activity/subcategory_icon.png" width={18} height={18} alt="icon" />
                    Sub Category
                  </label>

                  <div
                    onClick={() => setSubcategoryOpen(!subcategoryOpen)}
                    className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <span className="text-gray-600">{subcategory || "Select Subcategory"}</span>
                    <span>▾</span>
                  </div>

                  <AnimatePresence>
                    {subcategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 bg-gray-50 border rounded-lg p-2"
                      >
                        {subcategories.map((c) => (
                          <div
                            key={c}
                            className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => {
                              setSubcategory(c);
                              setSubcategoryOpen(false);
                            }}
                          >
                            {c}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* GROUP 2 */}
              <div className="space-y-3 mb-6">

                {/* HARI MULTI-SELECT */}
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Image src="/img/add-activity/hari_icon.png" width={18} height={18} alt="icon" />
                    Hari
                  </label>

                  <div
                    onClick={() => setHariOpen(!hariOpen)}
                    className="flex justify-between items-center bg-gray-50 border rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <span className="text-gray-600">
                      {hari.length ? hari.join(", ") : "Select Days"}
                    </span>
                    <span>▾</span>
                  </div>

                  <AnimatePresence>
                    {hariOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 bg-gray-50 border rounded-lg p-2"
                      >
                        {days.map(d => (
                          <label
                            key={d}
                            className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                            onClick={() => toggleDay(d)}
                          >
                            <input type="checkbox" checked={hari.includes(d)} readOnly />
                            {d}
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Repeat */}
                <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                  <Image src="/img/add-activity/repeat_icon.png" width={20} height={20} alt="icon" />
                  <input type="text" placeholder="Repeat" className="flex-1 bg-transparent outline-none text-gray-600" />
                </div>

                {/* Total Time */}
                <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                  <Image src="/img/add-activity/total_time_icon.png" width={20} height={20} alt="icon" />
                  <input type="text" placeholder="Total Time" className="flex-1 bg-transparent outline-none text-gray-600" />
                </div>

                {/* Break */}
                <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-3 py-2">
                  <Image src="/img/add-activity/break_icon.png" width={20} height={20} alt="icon" />
                  <input type="text" placeholder="Break" className="flex-1 bg-transparent outline-none text-gray-600" />
                </div>
              </div>

              {/* GROUP 3 */}
              <div className="mb-24">
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  Add Description
                </label>

                <textarea
                  placeholder="Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border rounded-lg p-3 h-24 resize-none text-gray-600 outline-none"
                />
              </div>

              {/* TRASH CAN */}
              <button onClick={clearAll} className="absolute bottom-6 right-6">
                <Image src="/img/add-activity/trashcan_icon.png" width={26} height={26} alt="trash" />
              </button>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
