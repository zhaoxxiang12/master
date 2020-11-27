
import imageio

# 需要合在一起的图片
image_list = [r'F:/new/pic/' + str(x) + ".jpg" for x in range(1,10)]
print(image_list)
# gif的图片名
gif_name = r'F:\new\pic\jj.gif'

frames = []
for image_name in image_list:
    frames.append(imageio.imread(image_name))

# druation : 图片切换的时间，单位秒
imageio.mimsave(gif_name, frames, 'GIF', duration=1)
print(frames)