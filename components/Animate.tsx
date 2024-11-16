import Link from 'next/link';
import Image from 'next/image';
import TnfImg from '@/public/images/bubblebubble2.png';
import LImg1 from '@/public/images/leaves/leaves1.png';
import LImg2 from '@/public/images/leaves/leaves2.png';
import LImg3 from '@/public/images/leaves/leaves3.png';
import LImg4 from '@/public/images/leaves/leaves4.png';
import { useEffect } from 'react';

export default function SeasonalAnimation() {
  useEffect(() => {
    // 낙엽 이미지 배열
    const leafImages = [LImg1, LImg2, LImg3, LImg4];

    // 현재 날짜 기준으로 계절 판단
    const today = new Date();
    const month = today.getMonth() + 1; // 월 (0~11이므로 +1)

    function createAnimation() {
      const element = document.createElement('div');

      // 가을: 낙엽 애니메이션
      if (month >= 9 && month <= 11) {
        element.className = 'leaf';
        element.style.left = Math.random() * 100 + 'vw'; // 랜덤 위치
        element.style.animationDuration = 3 + Math.random() * 8 + 's'; // 랜덤 애니메이션 시간
        const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
        element.style.backgroundImage = `url(${randomImage.src})`;
        element.style.backgroundSize = 'cover';
      } 
      // 겨울: 눈 애니메이션 (11월부터 2월까지)
      else if ( month === 12 || month <= 2) {
        element.className = 'snowflake';
        element.style.left = Math.random() * 100 + 'vw'; // 랜덤 위치
        element.style.animationDuration = 3 + Math.random() * 8 + 's'; // 랜덤 애니메이션 시간

        // 눈송이 크기 랜덤 설정 (5px ~ 15px)
        const size = 4 + Math.random() * 10 + 'px';
        element.style.width = size;
        element.style.height = size;
      }

      document.body.appendChild(element);

      setTimeout(() => {
        element.remove();
      }, 5000);
    }

    // 일정 간격으로 애니메이션 요소 생성
    const interval = setInterval(createAnimation, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/" legacyBehavior>
      <a className="inline-flex tnf-img-wrapper ">
        <Image
          className="tnf-img max-w-none animate-float"
          src={TnfImg}
          width={300}
          priority
          alt="Stellar"
        />
      </a>
    </Link>
  );
}
