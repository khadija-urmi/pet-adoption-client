import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import img1 from "../../../assets/gallery1.jpg";
import img2 from "../../../assets/gallery2.jpg";
import img3 from "../../../assets/gallery3.jpg";
import img4 from "../../../assets/gallery4.jpg";
import img5 from "../../../assets/gallery5.jpg";
import img6 from "../../../assets/gallery6.jpg";
import img7 from "../../../assets/gallery7.jpg";
import img8 from "../../../assets/gallery8.jpg";
import img9 from "../../../assets/gallery9.jpg";

const PetGallery = () => {
    return (
        <div className="py-20 px-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl">
            <div className="max-w-7xl mx-auto text-center text-white">
                <h3 className="text-4xl font-bold mb-4">IMAGE TOUR</h3>
                <h2 className="text-xl font-semibold mb-6">GALLERY</h2>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={img1} alt="Gallery Image 1" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img2} alt="Gallery Image 2" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img3} alt="Gallery Image 3" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img4} alt="Gallery Image 4" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img5} alt="Gallery Image 5" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img6} alt="Gallery Image 6" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img7} alt="Gallery Image 7" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img8} alt="Gallery Image 8" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={img9} alt="Gallery Image 9" className="w-full h-auto rounded-lg" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default PetGallery;
