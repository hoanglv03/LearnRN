import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import useImage from '../../hooks/useImage';

const {height} = Dimensions.get('screen');
const DATA = [
  'Bà Trương Mỹ Lan có hay không tham ô, chỉ đạo đưa hối lộ; số tiền phải bồi thường cho SCB... là những vấn đề tòa sẽ chốt để đưa ra phán quyết đối với Chủ tịch Vạn Thịnh Phát. Ngày 11/4, sau hơn một tháng xét xử, TAND TP HCM tuyên án đối với bà Trương Mỹ Lan (68 tuổi, Chủ tịch Tập đoàn Vạn Thịnh Phát) và 85 người khác liên quan đến các sai phạm tại Ngân hàng thương mại cổ phần Sài Gòn - SCB.',
  'Quá trình xét hỏi và tranh luận, 80/86 bị cáo thừa nhận toàn bộ hành vi phạm tội (5 người trốn truy nã bị xét xử vắng mặt). Họ xin HĐXX xem xét toàn diện vụ án, đánh giá tính chất, mức độ, vai trò của mình và khoan hồng giảm nhẹ hình phạt. Riêng bà Trương Mỹ Lan và các luật sư còn nhiều nội dung không cùng quan điểm truy tố của VKS về tội Tham ô, Đưa hối lộ, định giá tài sản và số tiền thiệt hại. Do đại án có nhiều bị cáo, tính chất phức tạp, đặc biệt nghiêm trọng nên phần tuyên án sẽ kéo dài. Dự kiến cuối ngày tòa sẽ đưa ra phán quyết.',
  '5 Pháp luậtThứ năm, 11/4/2024, 06:00 (GMT+7) Mấu chốt quyết định bản án đối với bà Trương Mỹ Lan TP HCMBà Trương Mỹ Lan có hay không tham ô, chỉ đạo đưa hối lộ; số tiền phải bồi thường cho SCB... là những vấn đề tòa sẽ chốt để đưa ra phán quyết đối với Chủ tịch Vạn Thịnh Phát. Ngày 11/4, sau hơn một tháng xét xử, TAND TP HCM tuyên án đối với bà Trương Mỹ Lan (68 tuổi, Chủ tịch Tập đoàn Vạn Thịnh Phát) và 85 người khác liên quan đến các sai phạm tại Ngân hàng thương mại cổ phần Sài Gòn - SCB. AdvertisementCác bị cáo chủ chốt trước giờ tuyên án, sáng 11/4. Video: Nguyễn Điệp Quá trình xét hỏi và tranh luận, 80/86 bị cáo thừa nhận toàn bộ hành vi phạm tội (5 người trốn truy nã bị xét xử vắng mặt). Họ xin HĐXX xem xét toàn diện vụ án, đánh giá tính chất, mức độ, vai trò của mình và khoan hồng giảm nhẹ hình phạt. Riêng bà Trương Mỹ Lan và các luật sư còn nhiều nội dung không cùng quan điểm truy tố của VKS về tội Tham ô, Đưa hối lộ, định giá tài sản và số tiền thiệt hại. Do đại án có nhiều bị cáo, tính chất phức tạp, đặc biệt nghiêm trọng nên phần tuyên án sẽ kéo dài. Dự kiến cuối ngày tòa sẽ đưa ra phán quyết. Bà Trương Mỹ Lan trước giờ tuyên án, sáng 11/4. Ảnh: Thanh Tùng Bà Trương Mỹ Lan trước giờ tuyên án, sáng 11/4. Ảnh: Thanh Tùng.Quan điểm trái chiều về tội Tham ô tài sản.Sau nhiều vòng tranh luận, VKS vẫn giữ nguyên quan điểm xác định bà Lan đã lợi dụng chính sách của Nhà nước trong đề án tái cơ cấu SCB, thâu tóm nhà băng (sở hữu 91,5 % cổ phần) trong suốt 10 năm (2012-2022) như một công cụ tài chính để huy động vốn, rút tiền, chiếm đoạt, phục vụ kinh doanh cá nhân và Hệ sinh thái của Vạn Thịnh Phát. Theo VKS, bị cáo phạm tội nhiều lần trong thời gian dài, có tổ chức, thủ đoạn tinh vi; không thành khẩn, khai báo quanh co, đổ lỗi cho cấp dưới; gây hậu quả đặc biệt nghiêm trọng... nên đề nghị mức án tử hình về các tội Tham ô tài sản; 20 năm tù về tội Đưa hối lộ; 19-20 năm tội Vi phạm quy định về cho vay trong hoạt động của các tổ chức tín dụng. Tổng hợp hình phạt, VKS đề nghị mức án tử hình đối với bà Lan.',
];
const News = () => {
  const images = useImage();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeButton, setActiveButton] = useState(null);
  const topEdge = activeButton?.y - height + activeButton?.height + 59;
  const inputRange = [-1, 0, topEdge - 30, topEdge, topEdge + 1];

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView />
      <StatusBar hidden />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{padding: 20}}>
        <Text style={{fontWeight: '900', fontSize: 30, marginBottom: 10}}>
          NEWS UPDATE
        </Text>
        {DATA.map((item, index) => {
          return (
            <View key={index}>
              {index % 2 === 0 && (
                <Image
                  source={{uri: images[index + 3]?.src?.portrait}}
                  style={{width: '100%', height: 400}}
                />
              )}
              <Text style={{marginTop: 10}}>{item}</Text>
            </View>
          );
        })}

        <Animated.View
          onLayout={ev => {
            setActiveButton(ev.nativeEvent.layout);
          }}
          style={[styles.actionButton, {backgroundColor: 'red'}]}
        />
        <View>
          <Text style={{fontWeight: '900', fontSize: 30, marginBottom: 10}}>
            FEATURE
          </Text>
          {DATA.map((item, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', margin: 5, paddingRight: 20}}>
                <Image
                  source={{uri: images[index + 3]?.src?.portrait}}
                  style={{width: 100, height: 100}}
                />
                <Text style={{marginLeft: 10}} numberOfLines={3}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
      {activeButton && (
        <Animated.View
          style={[
            styles.actionButton,
            {
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: -10,
              backgroundColor: 'rgba(255, 255, 255,0.8)',
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange,
                    outputRange: [0, 0, 0, 0, -1],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/sun.png')} />
            <Animated.Text
              style={{
                paddingLeft: 10,
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 0, 2],
                }),
              }}>
              321
            </Animated.Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../../assets/images/share_2.png')} />
            <Animated.Text
              style={[
                styles.textDola,
                {
                  transform: [
                    {
                      translateX: scrollY.interpolate({
                        inputRange,
                        outputRange: [50, 50, 50, 0, 0],
                      }),
                    },
                  ],
                },
              ]}>
              $
            </Animated.Text>
            <Animated.Image
              style={{
                opacity: scrollY.interpolate({
                  inputRange,
                  outputRange: [0, 0, 0, 0, 2],
                }),
              }}
              source={require('../../assets/images/share_1.png')}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    height: 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    marginVertical: 10,
  },
  textDola: {color: 'green', fontSize: 26, paddingHorizontal: 30},
});
export default News;
