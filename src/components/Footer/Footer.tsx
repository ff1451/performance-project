import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.legal}>
          <p>© 2025 공연 정보 알리미. All Rights Reserved.</p>
          <p>
            본 서비스는 KOPIS API를 활용하여 제작되었으며, 제공된 데이터의
            정확성과 최신성은 KOPIS에 의해 보장되지 않을 수 있습니다.
          </p>
          <p>
            출처: (재)예술경영지원센터 공연예술통합전산망{" "}
            <a
              href="https://www.kopis.or.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.kopis.or.kr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
