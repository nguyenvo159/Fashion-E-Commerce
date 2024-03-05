<template>
    <footer class="footer">
        <div class="container-fluid pt-5 p-3 bg-dark text-white">
            <div class="row justify-content-center font-14px">
                <h4 class="col-10 mb-4 ml-5" style=" color: var(--main-color); letter-spacing: 2px;"><b>AMIRI -
                        LOCAL BRAND</b>
                </h4>

                <div class="col-lg-4 col-12 row justify-content-center">
                    <div>
                        <h5 class=" mb-3">
                            <i class="fa-solid fa-location-dot fa-lg mr-1" style="color: #ffffff;"></i>
                            Hệ thống cửa hàng
                        </h5>
                        <p class="text-justify m-4"><b>TP Hồ Chí Minh</b> <br>
                            <i>5 đường số 2, khu phố 2, phường Tam Bình, TP. Thủ Đức
                                182/13A Lê Văn Sỹ, Phường 10, quận Phú Nhuận.</i>
                        </p>
                        <p class="text-justify m-4"><b>TP Cần Thơ</b> <br>
                            <i>Ninh Kiều: 110/5/2 hẻm 5 đường Nguyễn Việt Hồng, Phường An Phú.</i>
                        </p>

                    </div>
                </div>
                <div class="col-lg-3 col-6 row justify-content-center">
                    <div>
                        <h4>Liên hệ</h4>
                        <p><b>Theo dõi chúng tôi tại:</b> <br>

                            <a href="https://facebook.com/nguyenph2212/">
                                <i class="mt-3 mr-3 fa-brands fa-2x fa-facebook" style="color: #ffffff;"></i> </a>
                            <a href="https://www.instagram.com/v_p1202/">
                                <i class="mt-3 mr-3 fa-brands fa-2x fa-instagram" style="color: #ffffff;"></i> </a>
                            <a href="https://www.tiktok.com/">
                                <i class="mt-3 mr-3 fa-brands fa-2x fa-tiktok" style="color: #ffffff;"></i></a>
                            <a href="https://twitter.com/">
                                <i class="mt-3 mr-3 fa-brands fa-2x fa-twitter" style="color: #ffffff;"></i></a>
                            <a href="https://www.youtube.com/">
                                <i class="mt-3 mr-3 fa-brands fa-2x fa-youtube" style="color: #ffffff;"></i></a>
                        </p>
                        <p>
                            <i class="fa-solid fa-phone fa-lg mr-2" style="color: #ffffff;"></i>
                            <a href="tel:0763962680" style="text-decoration: underline; color: #ffffff;">
                                0763962680</a>
                        </p>

                        <p>
                            <i class=" fa-regular fa-envelope fa-lg mr-2" style="color: #ffffff;"></i>
                            <a href="mailto:nguyenvo1373.hg@gmail.com" style="text-decoration: underline; color: #ffffff;">
                                nguyenvo1373.hg@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
                <div class=" col-lg-3 col-6 row justify-content-center">
                    <div>
                        <h4 class="">About Us</h4>
                        <ul class="list-unstyled">
                            <li class="mb-2"> <a class="text-white text-decoration-none" href="/">Trang Chủ</a></li>

                            <li class="mb-2">
                                <a  class="text-white text-decoration-none">
                                    Sản Phẩm
                                </a>
                            </li>
                            <li class="mb-2">
                                <a :to="{ name: 'about' }" class="text-white text-decoration-none">
                                    Về Chúng Tôi
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 col-12 text-center">
                    <p>Copyright© 2023 Local Brand Amiri. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style>



</style>