<template>
  <div class="pt-[56px]">
    <van-cell-group class="mt-3">
      <van-cell title="头像" center :clickable="true" @click="OpenDialog(1)">
        <template #right-icon>
          <img v-if="fileList[0]" :src="fileList[0].url" alt="" class="rounded-full w-[50px] h-[50px]">
        </template>
      </van-cell>
      <van-cell title="昵称" center :clickable="true" @click="OpenDialog(2)">
        <template #right-icon>
          <div class="text-xs">{{ User.nickname }}</div>
        </template>
      </van-cell>
      <van-cell title="性别" center :clickable="true" @click="OpenDialog(3)">
        <template #right-icon>
          <div class="text-xs">
            <span v-if="User.gender == 0">保密</span>
            <span v-if="User.gender == 1">男</span>
            <span v-if="User.gender == 2">女</span>
          </div>
        </template>
      </van-cell>
      <van-cell title="二维码" center :clickable="true" to="/Description/QR">
        <template #right-icon>
          <van-icon name="qr" size="17px" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="mt-3">
      <van-cell title="生日" center :clickable="true" @click.stop="Calendarshow = true">
        <template #right-icon>
          <div class="text-xs">{{ CalendarText }}</div>
        </template>
      </van-cell>
      <van-cell title="地区" center :clickable="true" @click="OpenDialog(5)">
        <template #right-icon>
          <div v-if="areaList" class="text-xs">
            {{ areaList['province_list'][User.province] }} {{ areaList['city_list'][User.city] }}
          </div>
        </template>
      </van-cell>
      <van-cell title="大学" center :clickable="true">
        <template #right-icon>
          <div class="text-xs">未填写</div>
        </template>
      </van-cell>
      <van-cell title="音乐标签" center :clickable="true">
        <template #right-icon>
          <div class="text-xs">选择标签</div>
        </template>
      </van-cell>
      <van-cell title="简介" center :clickable="true" @click="OpenDialog(6)">
        <template #right-icon>
          <div class="text-xs">{{ User.signature || '还没有简介' }}</div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="mt-3">
      <van-cell title="个人主页隐私设置" center :clickable="true" />
      <van-cell title="主页模块顺序设置" center :clickable="true" />
    </van-cell-group>
    <van-cell-group class="mt-3">
      <van-cell title="账号和绑定顶设置" center :clickable="true" />
    </van-cell-group>
    <van-dialog v-model="DialogShow" closeOnClickOverlay show-cancel-button :showCancelButton="false" :showConfirmButton="false">
      <div v-if="DialogType == 1" class="p-3">
        <van-uploader v-model="fileList" :max-count="1" result-type="file" :after-read="afterRead" @delete="DeleteSince"  />
      </div>
      <div v-if="DialogType == 2">
        <van-field v-model="User.nickname" autosize label="昵称" type="textarea" maxlength="50" placeholder="请输入留言" show-word-limit />
      </div>
      <div v-if="DialogType == 3">
        <van-cell-group>
          <van-cell title="保密" center :clickable="true" @click="EditorGender(0)">
            <template #right-icon>
              <van-icon v-if="User.gender == 0" name="success" class="search-icon" />
            </template>
          </van-cell>
          <van-cell title="男" center :clickable="true" @click="EditorGender(1)">
            <template #right-icon>
              <van-icon v-if="User.gender == 1" name="success" class="search-icon" />
            </template>
          </van-cell>
          <van-cell title="女" center :clickable="true" @click="EditorGender(2)">
            <template #right-icon>
              <van-icon v-if="User.gender == 2" name="success" class="search-icon" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-if="DialogType == 5">
        <van-area :area-list="areaList" :value="User.city" cancel-button-text=" " columns-num="2" @confirm="AreaConfirm" />
      </div>
      <div v-if="DialogType == 6">
        <van-field v-model="User.signature" autosize label="简介" type="textarea" maxlength="300" placeholder="一句话介绍" show-word-limit />
      </div>
    </van-dialog>
    <van-calendar
        v-model="Calendarshow"
        :default-date="TimeFormatter(User.birthday)"
        :min-date="minDate"
        :max-date="maxDate"
        round
        @confirm="GetCalendar"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { SetUserDetail, SetUseravatar } from "@/API/User";
import moment from 'moment'

export default {
  name: "AccountSetting",
  data() {
    return {
      Calendarshow: false, // 弹出日历框
      DialogShow: false, // 弹出编辑框框
      DialogType: 0,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      User: {
        nickname: sessionStorage.getItem('nickname') || '',
        birthday: Number(sessionStorage.getItem('birthday')) || 0,
        province: sessionStorage.getItem('province') || '420000',
        city: sessionStorage.getItem('city') || '420200',
        gender: sessionStorage.getItem('gender') || 0,
        signature: sessionStorage.getItem('signature') || '',
      },
      CalendarText: '', // 日历页面渲染显示的文本
      areaList: areaList, // 各个省份地区详情信息
      fileList: [{ url: sessionStorage.getItem('avatarUrl') || '', status: 'done' }], // 头像图片集合
    }
  },
  watch: {
    'User.birthday': {
      handler(value) {
        this.CalendarText = moment(value).format("MM/DD")
      },
      immediate: true
    },
    DialogShow(value) {
      if(!value && this.DialogType != 1) {
        this.UpdateDate()
      }
      if(this.DialogType == 1) this.fileList = [{ url: sessionStorage.getItem('avatarUrl') || '' }]
    },
    Calendarshow(value) {
      if(!value) {
        this.UpdateDate()
      }
    }
  },
  methods: {
    // 上传图片后的操作
    async afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...'
      let formData = new FormData();
      formData.append('imgFile', file.file)
      await SetUseravatar(formData).then(res => {
        sessionStorage.setItem('avatarUrl', res.data.url);
        this.$notify({ type: 'success', message: '头像成功!' });
        setTimeout(() => {
          file.status = 'done';
          file.message = '上传成功'
        },1500)
      }).catch(() => {
        this.$notify({ type: 'danger', message: '头像上传失败,请检查网络!' });
        file.status = 'failed';
        file.message = '上传失败'
      })
    },
    // 删除头像
    DeleteSince(value) {
      this.fileList = []
      console.log(value);
    },
    // 更改性别
    EditorGender(value) {
      this.User.gender = value;
    },
    // 打开弹框
    OpenDialog(type) {
      this.DialogType = type;
      this.DialogShow = true
    },
    // 时间戳转化为日期对象
    TimeFormatter(value) {
      const y = moment(value).format("YYYY") || 1990;
      const m = moment(value).format("MM") || 0;
      const d = moment(value).format("DD") || 1;
      return new Date(y, m - 1, d)
    },
    // 选择日历框
    GetCalendar(value) {
      this.User.birthday = Number(moment(value).format('x')); // 把选中时间转化为时间戳
      this.Calendarshow = false; // 关闭日历弹框
    },
    // 地区完成弹窗
    AreaConfirm(value) {
      this.User.province = value[0].code;
      this.User.city = value[1].code;
      this.DialogShow = false;
    },
    // 修改用户信息
    async UpdateDate() {
      await SetUserDetail(this.User).then(res => {
        sessionStorage.setItem('birthday', this.User.birthday);
        sessionStorage.setItem('gender', this.User.gender);
        sessionStorage.setItem('nickname', this.User.nickname);
        sessionStorage.setItem('province', this.User.province);
        sessionStorage.setItem('city', this.User.city);
        sessionStorage.setItem('signature', this.User.signature);
        this.$notify({ type: 'success', message: '用户信息修改成功!' });
      }).catch(err => {
        this.User = {
          nickname: sessionStorage.getItem('nickname') || '',
          birthday: Number(sessionStorage.getItem('birthday')) || 0,
          province: sessionStorage.getItem('province') || '420000',
          city: sessionStorage.getItem('city') || '420200',
          gender: sessionStorage.getItem('gender') || 0,
          signature: sessionStorage.getItem('signature') || '',
        }
        this.$notify({ type: 'danger', message: '用户信息修改失败,请重试!' });
      })
    }
  }
}
</script>

<style scoped>

</style>