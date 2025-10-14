import React, { useState } from 'react';
import './AI.css';

function SubscriptionPage() {
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = () => {
    setShowModal(true);
  };

  const handlePaymentChoice = (method: string) => {
    alert(`تم اختيار وسيلة الدفع: ${method}`);
    setShowModal(false);
  };

  return (
    <div className="subscription-page">
      <section className="subscription-hero">
        <h1>
          <span className="bold">اختر خطتك</span>{' '}
          <span className="highlight-gold">المميزة</span>
        </h1>
        <p className="subtitle">استمتع بمزايا غير محدودة مع خطة AI Plus</p>
      </section>

      <div className="subscription-card">
        <div className="badge">⭐ الخطة المميزة</div>

        <h2 className="plan-title">AI Plus</h2>
        <div className="plan-price">
          $10 <span>/الشهر</span>
        </div>

        <ul className="plan-features">
          {[
            'إنشاء صور غير محدودة',
            'إنشاء فيديوهات بدقة 4K',
            'أولوية في المعالجة',
            'وصول لجميع الأنماط الفنية',
            'دعم فني على مدار الساعة',
            'تحميل بدون علامة مائية',
          ].map((f, i) => (
            <li key={i}>
              <span>{f}</span> <span className="check">✓</span>
            </li>
          ))}
        </ul>

        <button className="subscribe-btn" onClick={handleSubscribe}>
          🚀 اشترك الآن
        </button>
        <p className="cancel-note">يمكنك إلغاء الاشتراك في أي وقت</p>
      </div>

      {showModal && (
        <div className="payment-overlay" onClick={() => setShowModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>اختر وسيلة الدفع</h2>
            <p>الرجاء اختيار طريقة الدفع المفضلة لديك</p>
            <div className="payment-options">
              <button
                className="payment-btn visa"
                onClick={() => handlePaymentChoice('Visa / MasterCard')}
              >
                💳 Visa / MasterCard
              </button>
              <button
                className="payment-btn paypal"
                onClick={() => handlePaymentChoice('PayPal')}
              >
                🟦 PayPal
              </button>
              <button className="payment-cancel" onClick={() => setShowModal(false)}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
