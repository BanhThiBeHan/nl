<template>
    <div>
        <!-- image -->
        <div>
            <div class="carousel w-full">
                <div id="slide1" class="carousel-item relative w-full ">
                    <img src="https://i.ytimg.com/vi/UXqxTZ67Jio/maxresdefault.jpg" class="w-full h-[890px]" />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" class="btn btn-circle">❮</a>
                        <a href="#slide2" class="btn btn-circle">❯</a>
                    </div>
                </div>
                        
                <div id="slide2" class="carousel-item relative w-full">
                    <img src="https://i.ytimg.com/vi/nxsLkEPYR-4/maxresdefault.jpg" class="w-full h-[890px]" />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" class="btn btn-circle">❮</a>
                        <a href="#slide3" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" class="carousel-item relative w-full ">
                    <img src="https://news-thumb2.ymgstatic.com/YanThumbNews/2167221/202211/3d230a5d-7d72-470b-ab30-87456518b1af.jpg"
                        class="w-full h-[890px]" />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" class="btn btn-circle">❮</a>
                        <a href="#slide4" class="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" class="carousel-item relative w-full">
                    <img src="https://i.ytimg.com/vi/hjvRIpU6acQ/maxresdefault.jpg" class="w-full h-[890px]" />
                    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" class="btn btn-circle">❮</a>
                        <a href="#slide1" class="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>

</script>

<style>

</style>